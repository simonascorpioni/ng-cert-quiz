import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMaker2Component } from './quiz-maker2.component';

describe('QuizMaker2Component', () => {
  let component: QuizMaker2Component;
  let fixture: ComponentFixture<QuizMaker2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizMaker2Component]
    });
    fixture = TestBed.createComponent(QuizMaker2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
