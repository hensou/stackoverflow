import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  DateAdapter,
  NativeDateAdapter,
  MatNativeDateModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StackOverflowService } from './services/stack-overflow.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuestionDialogComponent,
    
  ],
  entryComponents: [QuestionDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatSliderModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule 
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    StackOverflowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
