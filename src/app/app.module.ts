import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeeklyPlannerComponent } from './academics/weekly-planner/weekly-planner.component';
import { DayCardComponent } from './academics/day-card/day-card.component';
import { PriorityListComponent } from './academics/priority-list/priority-list.component';
import { NotesSectionComponent } from './academics/notes-section/notes-section.component';
import { TodoListComponent } from './academics/todo-list/todo-list.component';
import { MissedTasksComponent } from './academics/missed-tasks/missed-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    WeeklyPlannerComponent,
    DayCardComponent,
    PriorityListComponent,
    NotesSectionComponent,
    TodoListComponent,
    MissedTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
