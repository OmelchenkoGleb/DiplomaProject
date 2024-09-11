import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaPracticeComponent } from './diploma-practice.component';

describe('DiplomaPracticeComponent', () => {
  let component: DiplomaPracticeComponent;
  let fixture: ComponentFixture<DiplomaPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
