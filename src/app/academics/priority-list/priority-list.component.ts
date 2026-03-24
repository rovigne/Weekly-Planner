import { Component, OnInit } from '@angular/core';
import { ToDoListService, Priority } from '../to-do-list.service';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent implements OnInit {
  priorities: Priority[] = [];
  newPriorityTitle: string = '';
  priorityCount: number = 1;

  constructor(private plannerService: ToDoListService) {}

  ngOnInit(): void {
    this.plannerService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
      this.priorityCount = priorities.length + 1;
    });
  }

  addPriority(): void {
    if (this.newPriorityTitle.trim()) {
      this.plannerService.addPriority(this.newPriorityTitle);
      this.newPriorityTitle = '';
    }
  }

  removePriority(id: string): void {
    this.plannerService.removePriority(id);
  }
}