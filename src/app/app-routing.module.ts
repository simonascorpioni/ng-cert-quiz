import {inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QuizMakerComponent} from './components/quiz-maker/quiz-maker.component';
import {AnswersComponent} from './components/answers/answers.component';
import {QuizService} from './services/quiz.service';
import { QuizMaker2Component } from './components/quiz-maker2/quiz-maker2.component';

const routes: Routes = [{
  path: "result", component: AnswersComponent, resolve: {data: () => inject(QuizService).getLatestResults()}
},{
  path: "quiz-step1", component: QuizMakerComponent
},{
  path: "**", component: QuizMaker2Component
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
