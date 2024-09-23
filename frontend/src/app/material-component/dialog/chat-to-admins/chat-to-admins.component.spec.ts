import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatToAdminsComponent } from './chat-to-admins.component';

describe('ChatToAdminsComponent', () => {
  let component: ChatToAdminsComponent;
  let fixture: ComponentFixture<ChatToAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatToAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatToAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
