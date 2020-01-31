import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag, Question } from '../interfaces/question';
import { MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { element } from 'protractor';
import { StackOverflowService } from '../stack-overflow.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { FormControl } from '@angular/forms';

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

  mostVotedQuestions: Question[];
  mostRecentQuestions: Question[];
  votedDataSource: MatTableDataSource<Question>;
  recentDataSource: MatTableDataSource<Question>;

  fromDate: Date = new Date((new Date()).setDate(-7));
  toDate: Date = new Date();

  fromDateControl: FormControl = new FormControl(this.fromDate);
  toDateControl: FormControl = new FormControl(this.toDate);

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
    await this.fecthData();
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

  async fecthData():Promise<void> {

    const tags = this.tags.map(tag => tag.name);
    const params = { 
      tagged: tags.join(';'),
      fromDate: Math.floor(this.fromDate.getTime() / 1000),
      toDate: Math.floor(this.toDate.getTime() / 1000)
    };

    this.mostVotedQuestions = await this._stackService.getVotedQuestions(params);
    this.votedDataSource = new MatTableDataSource<Question>(this.mostVotedQuestions);
    this.mostRecentQuestions = await this._stackService.getRecentQuestions(params);
    this.recentDataSource = new MatTableDataSource<Question>(this.mostRecentQuestions);
  }

  fromDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fromDate = new Date(event.value);
  }

  toDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.toDate = new Date(event.value);
  }
}