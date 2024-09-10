import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDirectionofthesisComponent } from './manage-directionofthesis.component';

describe('ManageDirectionofthesisComponent', () => {
  let component: ManageDirectionofthesisComponent;
  let fixture: ComponentFixture<ManageDirectionofthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDirectionofthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDirectionofthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
