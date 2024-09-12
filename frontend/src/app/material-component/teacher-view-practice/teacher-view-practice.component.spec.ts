import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewPracticeComponent } from './teacher-view-practice.component';

describe('TeacherViewPracticeComponent', () => {
  let component: TeacherViewPracticeComponent;
  let fixture: ComponentFixture<TeacherViewPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherViewPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
