import {Component, inject, Input, OnChanges} from '@angular/core';
import {Question} from '../../models/data.models';
import {QuizService} from '../../services/quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnChanges {

  @Input()
  questions: Question[] | null = [];

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);
  showButtonToChange: boolean = true;

  ngOnChanges(): void {
    this.showButtonToChange = true;
  }

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }

  onQuestionChange(i: number){
    if (this.questions && this.questions.length >= 6 && i >= 0 && i < this.questions.length - 1) {
      this.questions[i] = this.questions[5];
      this.questions.pop();
      this.showButtonToChange = false;
    }
  }

}
