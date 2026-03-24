import { Component, OnInit } from '@angular/core';
import { ToDoListService, Task } from '../to-do-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoItems: Task[] = [];
  newTodoTitle: string = '';

  constructor(private plannerService: ToDoListService) {}

  ngOnInit(): void {}

  addTodoItem(): void {
    if (this.newTodoTitle.trim()) {
      this.plannerService.addTodoItem(this.newTodoTitle);
      this.todoItems = this.plannerService.getTodoList();
      this.newTodoTitle = '';
    }
  }

  removeTodoItem(id: string): void {
    this.plannerService.removeTodoItem(id);
    this.todoItems = this.plannerService.getTodoList();
  }

  toggleTodoItem(id: string): void {
    this.plannerService.toggleTodoItem(id);
    this.todoItems = this.plannerService.getTodoList();
  }
}