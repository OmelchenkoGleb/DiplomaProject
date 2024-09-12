import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewDiaryComponent } from './student-view-diary.component';

describe('StudentViewDiaryComponent', () => {
  let component: StudentViewDiaryComponent;
  let fixture: ComponentFixture<StudentViewDiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewDiaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
