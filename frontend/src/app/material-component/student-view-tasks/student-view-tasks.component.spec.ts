import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewTasksComponent } from './student-view-tasks.component';

describe('StudentViewTasksComponent', () => {
  let component: StudentViewTasksComponent;
  let fixture: ComponentFixture<StudentViewTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
