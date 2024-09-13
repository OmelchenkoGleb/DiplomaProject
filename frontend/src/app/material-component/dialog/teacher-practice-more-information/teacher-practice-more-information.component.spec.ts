import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPracticeMoreInformationComponent } from './teacher-practice-more-information.component';

describe('TeacherPracticeMoreInformationComponent', () => {
  let component: TeacherPracticeMoreInformationComponent;
  let fixture: ComponentFixture<TeacherPracticeMoreInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPracticeMoreInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPracticeMoreInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
