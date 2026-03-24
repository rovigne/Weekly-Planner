import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissedTasksComponent } from './missed-tasks.component';

describe('MissedTasksComponent', () => {
  let component: MissedTasksComponent;
  let fixture: ComponentFixture<MissedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
