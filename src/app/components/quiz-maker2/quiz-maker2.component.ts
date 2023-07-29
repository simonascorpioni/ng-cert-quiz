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
  categories$: Observable<Category[]> = this.quizService.getGroupedCategories();
  categories: Category[] = [];
  subcategories$!: Observable<Subcategory[]>;
  questions$!: Observable<Question[]>;
  selectedCategory: Category | null = null;
  categoryDropdown = new FormControl<string>('');
  subcategoryDropdown = new FormControl<string>('');


  constructor(protected quizService: QuizService) {
    this.categories$ = this.quizService.getGroupedCategories().pipe(
      tap(categories => this.categories = categories)
    );

    this.categories$ = this.categoryDropdown.valueChanges.pipe(
      withLatestFrom(this.quizService.getGroupedCategories()),
      map(([userInput, categories]) => categories.filter(c => c.name.toLowerCase().indexOf(userInput?.toLowerCase()?userInput?.toLowerCase(): '') !== -1))
    );

    //logica da spostare dentro il dropdown
    // if(this.subcategories$){
    //   this.subcategories$ = this.subcategoryDropdown.valueChanges.pipe(
    //     withLatestFrom(this.subcategories$),
    //     map(([userInput, subcategories]) => subcategories.filter(s => s.name.toLowerCase().indexOf(userInput?.toLowerCase()?userInput?.toLowerCase(): '') !== -1))
    //   );
    // }
  }

  updateCategories(category: Category) {
    this.categoryDropdown.setValue(category.name);
    this.selectedCategory = category;
    this.subcategories$ = this.selectedCategory && this.selectedCategory.subcategories
    ? of(this.selectedCategory.subcategories)
    : of([]);
  }

  updateSubcategories(subcategory: Subcategory) {
    this.categoryDropdown.setValue(subcategory.name);
  }

  createQuiz(difficulty: string): void {
    const id = this.subcategoryDropdown.value == '' ? this.selectedCategory?.id : this.subcategoryDropdown.value;
    if (id) {
      this.questions$ = this.quizService.createQuiz((id).toString(), difficulty as Difficulty);
    }

  }

}
