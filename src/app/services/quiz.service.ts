import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, Difficulty, ApiQuestion, Question, Results} from '../models/data.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php").pipe(
      map(res => res.trivia_categories)
    );
  }

  getGroupedCategories(): Observable<Category[]> {
    return this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php").pipe(
      map(res => {
        return res.trivia_categories.reduce((categories, currentCategory) => {
          if (currentCategory.name.includes(":")) {
            this._addSubcategory(categories, currentCategory);
          } else {
            categories.push({ ...currentCategory })
          }
          return categories
        }, new Array<Category>());
      })
    );
  }

  private _addSubcategory(allCategories: Category[], currentCategory: Category) {

    const [mainCategoryName, subCategoryName] = currentCategory.name.split(":")
    const existingCategory = allCategories.find(e => e.name === mainCategoryName)

    if (existingCategory) {
      this._pushSubcategory(existingCategory, subCategoryName.trim(), currentCategory.id);
    } else {
      const newCategory: Category = {
        name: mainCategoryName.trim(),
        id: currentCategory.id,
        subcategories: [{ name: subCategoryName.trim(), id: currentCategory.id }],
      };
      allCategories.push(newCategory);
    }
  }

  private _pushSubcategory(category: Category, subcategoryName: string, subcategoryId: number): void {
    if (category.subcategories) {
      category.subcategories.push({ name: subcategoryName, id: subcategoryId });
    } else {
      category.subcategories = [{ name: subcategoryName, id: subcategoryId }];
    }
  }

  createQuiz(categoryId: string, difficulty: Difficulty): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=6&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }
}
