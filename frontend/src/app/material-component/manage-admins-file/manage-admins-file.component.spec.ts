import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminsFileComponent } from './manage-admins-file.component';

describe('ManageAdminsFileComponent', () => {
  let component: ManageAdminsFileComponent;
  let fixture: ComponentFixture<ManageAdminsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdminsFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
