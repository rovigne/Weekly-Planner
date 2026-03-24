import { Component, Input, OnInit } from '@angular/core';
import { ToDoListService, DayTasks, Task } from '..//to-do-list.service';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent implements OnInit {
  @Input() day: DayTasks;
  newTaskTitle: string = '';

  constructor(private plannerService: ToDoListService) {
    this.day = { day: '', tasks: [] };
  }

  ngOnInit(): void {}

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.plannerService.addTask(this.day.day, this.newTaskTitle);
      this.newTaskTitle = '';
    }
  }

  removeTask(taskId: string): void {
    this.plannerService.removeTask(this.day.day, taskId);
  }

  toggleTask(taskId: string): void {
    this.plannerService.toggleTask(this.day.day, taskId);
  }

  getColorClass(): string {
    const colors: { [key: string]: string } = {
      'MON': 'red',
      'TUE': 'purple',
      'WED': 'orange',
      'THU': 'green',
      'FRI': 'coral',
      'WEEKEND': 'blue'
    };
    return colors[this.day.day] || 'gray';
  }

  // Get unchecked tasks
  getUncompletedTasks(): Task[] {
    return this.day.tasks.filter(t => !t.completed);
  }

  // Get checked tasks
  getCompletedTasks(): Task[] {
    return this.day.tasks.filter(t => t.completed);
  }
}