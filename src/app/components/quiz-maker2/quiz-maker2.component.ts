import { Component } from '@angular/core';
import { Category, Difficulty, Question, Subcategory } from '../../data.models';
import { Observable, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { QuizService } from '../../quiz.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz-maker2',
  templateUrl: './quiz-maker2.component.html',
  styleUrls: ['./quiz-maker2.component.css']
})
export class QuizMaker2Component {
  categories$: Observable<Category[]>;
  subcategories$!: Observable<Subcategory[] | null>;
  questions$!: Observable<Question[]>;
  selectedCategory!: Category;
  selectedSubcategory: Subcategory | undefined = undefined;


  constructor(protected quizService: QuizService) {
    this.categories$ = this.quizService.getGroupedCategories();
  }

  updateCategories(category: Category) {
    this.selectedCategory = category;
    this.selectedSubcategory = undefined;
    this.subcategories$ = category && category.subcategories
    ? of(category.subcategories)
    : of(null);
  }

  createQuiz(difficulty: string): void {
    const id = this.selectedSubcategory ? this.selectedSubcategory.id : this.selectedCategory.id;
    if (id) {
      this.questions$ = this.quizService.createQuiz((id).toString(), difficulty as Difficulty);
    }

  }

}
