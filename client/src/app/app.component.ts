import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { DataService } from './services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  questions = [];
  allQuestions = [];
  quizSubmitted = false;
  selectedQuestionIndex;
  result = {} as any;

  constructor(
    private dataService: DataService
  ) {

  }

  ngOnInit() {
    this.dataService.getQuestions().then((data: any) => {
      this.allQuestions = data.results;
      this.setQuestions();
    }).catch((error) => {
      console.log('error while fetching data', error)
    });
  }

  setQuestions() {
    this.questions = JSON.parse(JSON.stringify(_.sampleSize(this.allQuestions, 5)));
    this.selectedQuestionIndex = 1;
  }

  nextQuestion() {
    if (this.selectedQuestionIndex < 5) {
      this.selectedQuestionIndex++;
    }
  }

  submit() {
    this.result = {
      answered: this.questions.filter((q) => q.answer).length,
      correct: this.questions.filter((q) => q.answer && (q.answer.toLowerCase() === q.correct_answer.toLowerCase())).length,
      wrong: this.questions.filter((q) => q.answer && (q.answer.toLowerCase() !== q.correct_answer.toLowerCase())).length
    };
    this.result.score = (this.result.correct && this.result.answered ? ((100 * this.result.correct) / this.result.answered) : 0);
    this.quizSubmitted = true;
  }

  restartQuiz() {
    this.quizSubmitted = false;
    this.setQuestions();
  }
}
