import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag, Question } from '../interfaces/question';
import { MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { element } from 'protractor';
import { StackOverflowService } from '../stack-overflow.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent implements OnInit {

  public mostVotedQuestions: Question[];
  public mostRecentQuestions: Question[];
  public votedDataSource: MatTableDataSource<Question>;
  public recentDataSource: MatTableDataSource<Question>;

  displayedColumns = ['title', 'score', 'answers', 'createdAt', 'aswered', 'question_link'];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [
    { name: 'Android' },
    { name: 'Flutter' },
  ];

  constructor(private _stackService: StackOverflowService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this._init();
  }

  async _init() {
    this.mostVotedQuestions = await this._stackService.getVotedQuestions();
    this.votedDataSource = new MatTableDataSource<Question>(this.mostVotedQuestions);
    this.mostRecentQuestions = await this._stackService.getRecentQuestions();
    this.recentDataSource = new MatTableDataSource<Question>(this.mostRecentQuestions);
    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  openDialog(question: Question): void {
    this.dialog.open(QuestionDialogComponent, {
      width: '80%',
      data: question
    });
  }
}