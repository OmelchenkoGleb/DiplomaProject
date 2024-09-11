import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDiplomaPracticeComponent } from './manage-diploma-practice.component';

describe('ManageDiplomaPracticeComponent', () => {
  let component: ManageDiplomaPracticeComponent;
  let fixture: ComponentFixture<ManageDiplomaPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDiplomaPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDiplomaPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
