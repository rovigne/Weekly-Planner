import { Component, OnInit } from '@angular/core';
import { ToDoListService, Task } from '..//to-do-list.service';

@Component({
  selector: 'app-missed-tasks',
  templateUrl: './missed-tasks.component.html',
  styleUrls: ['./missed-tasks.component.css']
})
export class MissedTasksComponent implements OnInit {
  missedTasks: Task[] = [];

  constructor(private plannerService: ToDoListService) {}

  ngOnInit(): void {
    this.plannerService.getMissedTasks().subscribe(tasks => {
      this.missedTasks = tasks;
    });
  }

  removeMissedTask(id: string): void {
    this.plannerService.removeMissedTask(id);
    this.missedTasks = this.plannerService.getMissedTasksList();
  }

  toggleMissedTask(id: string): void {
    this.plannerService.toggleMissedTask(id);
    this.missedTasks = this.plannerService.getMissedTasksList();
  }

  addMissedTask(title: string): void {
    if (title.trim()) {
      this.plannerService.addMissedTask(title);
      this.missedTasks = this.plannerService.getMissedTasksList();
    }
  }
}