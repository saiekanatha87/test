import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {

  @Input() question: any;

  constructor() { }

  ngOnChanges(): void {
    if (!this.isTextQuestion()) {
      this.question.options = [];
      this.question.options = this.question.options.concat(this.question.incorrect_answers);
      this.question.options.push(this.question.correct_answer);
    }
  }

  isTextQuestion() {
    return this.question.type === 'text';
  }

}
