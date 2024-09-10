import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialityComponent } from './manage-speciality.component';

describe('ManageSpecialityComponent', () => {
  let component: ManageSpecialityComponent;
  let fixture: ComponentFixture<ManageSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSpecialityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
