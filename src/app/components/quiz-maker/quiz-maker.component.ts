import { Component } from '@angular/core';
import { Category, Difficulty, Question, Subcategory } from '../../models/data.models';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { QuizService } from '../../services/quiz.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {

  categories$: Observable<Category[]>;
  categories: Category[] = [];
  subcategories$!: Observable<Subcategory[]>;
  questions$!: Observable<Question[]>;
  selectedCategory: Category | null = null;
  categoryDropdown = new FormControl<Category['id']>(-1);
  subcategoryDropdown = new FormControl<Subcategory['id']>(-1);


  constructor(protected quizService: QuizService) {
    this.categories$ = this.quizService.getGroupedCategories().pipe(
      tap(categories => this.categories = categories)
    );
    
    this.subcategories$ = this.categoryDropdown.valueChanges.pipe(
      switchMap(categoryId => {
        this.subcategoryDropdown.setValue(-1);
        this.selectedCategory = this.categories.find(category => category.id == categoryId) || null;
        return this.selectedCategory && this.selectedCategory.subcategories
          ? of(this.selectedCategory.subcategories)
          : of([]);
      })
    );

  }

  createQuiz(difficulty: string): void {
    const id = this.subcategoryDropdown.value == -1 ? this.selectedCategory?.id : this.subcategoryDropdown.value;
    if (id) {
      this.questions$ = this.quizService.createQuiz((id).toString(), difficulty as Difficulty);
    }

  }
}
