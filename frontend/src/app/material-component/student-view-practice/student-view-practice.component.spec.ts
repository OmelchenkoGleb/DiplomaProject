import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewPracticeComponent } from './student-view-practice.component';

describe('StudentViewPracticeComponent', () => {
  let component: StudentViewPracticeComponent;
  let fixture: ComponentFixture<StudentViewPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
