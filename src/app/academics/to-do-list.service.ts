import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface DayTasks {
  day: string;
  tasks: Task[];
}

export interface Priority {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'WEEKEND'];
  
  private tasksData: DayTasks[] = [];
  private prioritiesData: Priority[] = [];
  private notesData = new BehaviorSubject<string>('');
  private todoListData: Task[] = [];
  private missedTasksData: Task[] = [];

  tasksSubject = new BehaviorSubject<DayTasks[]>(this.tasksData);
  prioritiesSubject = new BehaviorSubject<Priority[]>(this.prioritiesData);
  notesSubject = this.notesData.asObservable();
  missedTasksSubject = new BehaviorSubject<Task[]>(this.missedTasksData);

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('plannerTasks');
    if (savedTasks) {
      this.tasksData = JSON.parse(savedTasks);
    } else {
      this.tasksData = [
        { day: 'MON', tasks: [] },
        { day: 'TUE', tasks: [] },
        { day: 'WED', tasks: [] },
        { day: 'THU', tasks: [] },
        { day: 'FRI', tasks: [] },
        { day: 'WEEKEND', tasks: [] }
      ];
    }

    // Load priorities from localStorage
    const savedPriorities = localStorage.getItem('plannerPriorities');
    if (savedPriorities) {
      this.prioritiesData = JSON.parse(savedPriorities);
    }

    // Load notes from localStorage
    const savedNotes = localStorage.getItem('plannerNotes');
    if (savedNotes) {
      this.notesData.next(savedNotes);
    }

    // Load todo list from localStorage
    const savedTodoList = localStorage.getItem('plannerTodoList');
    if (savedTodoList) {
      this.todoListData = JSON.parse(savedTodoList);
    }

    // Load missed tasks from localStorage
    const savedMissedTasks = localStorage.getItem('plannerMissedTasks');
    if (savedMissedTasks) {
      this.missedTasksData = JSON.parse(savedMissedTasks);
    }

    // Initialize subjects with loaded data
    this.tasksSubject.next([...this.tasksData]);
    this.prioritiesSubject.next([...this.prioritiesData]);
    this.missedTasksSubject.next([...this.missedTasksData]);
  }

  // Save to localStorage
  private saveTasks(): void {
    localStorage.setItem('plannerTasks', JSON.stringify(this.tasksData));
  }

  private savePriorities(): void {
    localStorage.setItem('plannerPriorities', JSON.stringify(this.prioritiesData));
  }

  private saveNotes(notes: string): void {
    localStorage.setItem('plannerNotes', notes);
  }

  private saveTodoList(): void {
    localStorage.setItem('plannerTodoList', JSON.stringify(this.todoListData));
  }

  private saveMissedTasks(): void {
    localStorage.setItem('plannerMissedTasks', JSON.stringify(this.missedTasksData));
  }

  // Tasks Management
  addTask(day: string, title: string): void {
    const dayIndex = this.tasksData.findIndex(d => d.day === day);
    if (dayIndex !== -1) {
      this.tasksData[dayIndex].tasks.push({
        id: this.generateId(),
        title: title,
        completed: false
      });
      this.tasksSubject.next([...this.tasksData]);
      this.saveTasks();
    }
  }

  removeTask(day: string, taskId: string): void {
    const dayIndex = this.tasksData.findIndex(d => d.day === day);
    if (dayIndex !== -1) {
      this.tasksData[dayIndex].tasks = this.tasksData[dayIndex].tasks.filter(t => t.id !== taskId);
      this.tasksSubject.next([...this.tasksData]);
      this.saveTasks();
    }
  }

  toggleTask(day: string, taskId: string): void {
    const dayIndex = this.tasksData.findIndex(d => d.day === day);
    if (dayIndex !== -1) {
      const task = this.tasksData[dayIndex].tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.tasksSubject.next([...this.tasksData]);
        this.saveTasks();
      }
    }
  }

  getTasks() {
    return this.tasksSubject.asObservable();
  }

  // Priorities Management
  addPriority(title: string): void {
    this.prioritiesData.push({
      id: this.generateId(),
      title: title
    });
    this.prioritiesSubject.next([...this.prioritiesData]);
    this.savePriorities();
  }

  removePriority(id: string): void {
    this.prioritiesData = this.prioritiesData.filter(p => p.id !== id);
    this.prioritiesSubject.next([...this.prioritiesData]);
    this.savePriorities();
  }

  getPriorities() {
    return this.prioritiesSubject.asObservable();
  }

  // Notes Management
  updateNotes(notes: string): void {
    this.notesData.next(notes);
    this.saveNotes(notes);
  }

  // Todo List Management
  addTodoItem(title: string): void {
    this.todoListData.push({
      id: this.generateId(),
      title: title,
      completed: false
    });
    this.saveTodoList();
  }

  removeTodoItem(id: string): void {
    this.todoListData = this.todoListData.filter(t => t.id !== id);
    this.saveTodoList();
  }

  toggleTodoItem(id: string): void {
    const item = this.todoListData.find(t => t.id === id);
    if (item) {
      item.completed = !item.completed;
      this.saveTodoList();
    }
  }

  getTodoList(): Task[] {
    return this.todoListData;
  }

  // Missed Tasks Management
  addMissedTask(title: string): void {
    this.missedTasksData.push({
      id: this.generateId(),
      title: title,
      completed: false
    });
    this.missedTasksSubject.next([...this.missedTasksData]);
    this.saveMissedTasks();
  }

  removeMissedTask(id: string): void {
    this.missedTasksData = this.missedTasksData.filter(t => t.id !== id);
    this.missedTasksSubject.next([...this.missedTasksData]);
    this.saveMissedTasks();
  }

  toggleMissedTask(id: string): void {
    const task = this.missedTasksData.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.missedTasksSubject.next([...this.missedTasksData]);
      this.saveMissedTasks();
    }
  }

  getMissedTasks() {
    return this.missedTasksSubject.asObservable();
  }

  getMissedTasksList(): Task[] {
    return this.missedTasksData;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}