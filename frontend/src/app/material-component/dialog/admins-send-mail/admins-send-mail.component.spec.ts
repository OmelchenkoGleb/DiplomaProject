import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsSendMailComponent } from './admins-send-mail.component';

describe('AdminsSendMailComponent', () => {
  let component: AdminsSendMailComponent;
  let fixture: ComponentFixture<AdminsSendMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsSendMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
