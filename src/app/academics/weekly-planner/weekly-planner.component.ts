import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../to-do-list.service';

@Component({
  selector: 'app-weekly-planner',
  templateUrl: './weekly-planner.component.html',
  styleUrls: ['./weekly-planner.component.css']
})
export class WeeklyPlannerComponent implements OnInit {
  weekDateRange: string = '';
  dayColumns: any[] = [];

  constructor(private plannerService: ToDoListService) {
    this.weekDateRange = this.getWeekDateRange();
  }

  ngOnInit(): void {
    this.plannerService.getTasks().subscribe(tasks => {
      this.dayColumns = tasks;
    });
  }

  getWeekDateRange(): string {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const startMonth = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endMonth = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return `${startMonth} to ${endMonth}`;
  }
}