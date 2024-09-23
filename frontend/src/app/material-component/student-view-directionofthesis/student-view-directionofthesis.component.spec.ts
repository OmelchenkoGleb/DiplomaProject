import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewDirectionofthesisComponent } from './student-view-directionofthesis.component';

describe('StudentViewDirectionofthesisComponent', () => {
  let component: StudentViewDirectionofthesisComponent;
  let fixture: ComponentFixture<StudentViewDirectionofthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewDirectionofthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewDirectionofthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
