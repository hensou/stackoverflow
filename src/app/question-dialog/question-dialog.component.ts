import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Question } from '../interfaces/question';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss']
})
export class QuestionDialogComponent implements OnInit {

  question: Question

  constructor(@Inject(MAT_DIALOG_DATA) public data: Question) {
    this.question = data;
  }

  ngOnInit() {
  }

}
