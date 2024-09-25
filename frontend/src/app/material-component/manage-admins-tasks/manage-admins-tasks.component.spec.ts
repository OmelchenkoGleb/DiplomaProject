import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAdminsTasksComponent } from './manage-admins-tasks.component';

describe('ManageAdminsTasksComponent', () => {
  let component: ManageAdminsTasksComponent;
  let fixture: ComponentFixture<ManageAdminsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAdminsTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAdminsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
