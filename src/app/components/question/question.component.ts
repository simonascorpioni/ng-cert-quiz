import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from '../../models/data.models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input({required: true})
  question!: Question;
  @Input()
  correctAnswer?: string;
  @Input()
  userAnswer?: string;

  @Input() showButtonToChange!: boolean;

  getButtonClass(answer: string): string {
    if (! this.userAnswer) {
        if (this.currentSelection == answer)
          return "tertiary";
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return "tertiary";
      if (answer == this.correctAnswer)
        return "secondary";
    }
    return "primary";
  }

  @Output()
  change = new EventEmitter<string>();

  @Output()
  changeQuestion = new EventEmitter<void>();

  currentSelection!: string;

  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }

  onQuestionChange(){
    this.changeQuestion.emit();
  }
}
