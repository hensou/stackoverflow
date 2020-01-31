import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Tag, Question } from '../interfaces/question';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { element } from 'protractor';
import { StackOverflowService } from '../stack-overflow.service';

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

  DATA: Question[];
  displayedColumns = ['title', 'score'];
  dataSource: MatTableDataSource<Question>;
  expandedElement: Question | null;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [
    { name: 'Android' },
    { name: 'Kotlin' },
    { name: 'Flutter' },
  ];

  constructor(private _stackService: StackOverflowService) {

  }

  ngOnInit(): void {
    this._init();
  }

  async _init() {
    const { items } = await this._stackService.getAllQuestions();
    this.DATA = items;
    this.dataSource = new MatTableDataSource<Question>(this.DATA);
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


  expandQuestion(element: Question): void {
    this.expandedElement = this.expandedElement === element ? null : element
    element.score = 5;
  }

}
