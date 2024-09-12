import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewResultfileComponent } from './student-view-resultfile.component';

describe('StudentViewResultfileComponent', () => {
  let component: StudentViewResultfileComponent;
  let fixture: ComponentFixture<StudentViewResultfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewResultfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewResultfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
