import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsTasksComponent } from './admins-tasks.component';

describe('AdminsTasksComponent', () => {
  let component: AdminsTasksComponent;
  let fixture: ComponentFixture<AdminsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
