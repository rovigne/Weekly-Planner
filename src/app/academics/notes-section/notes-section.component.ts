import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../to-do-list.service';

@Component({
  selector: 'app-notes-section',
  templateUrl: './notes-section.component.html',
  styleUrls: ['./notes-section.component.css']
})
export class NotesSectionComponent implements OnInit {
  notesText: string = '';

  constructor(private plannerService: ToDoListService) {}

  ngOnInit(): void {
    this.plannerService.notesSubject.subscribe(notes => {
      this.notesText = notes;
    });
  }

  updateNotes(): void {
    this.plannerService.updateNotes(this.notesText);
  }
}