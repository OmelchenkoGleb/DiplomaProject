import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultFilesPracticeComponent } from './result-files-practice.component';

describe('ResultFilesPracticeComponent', () => {
  let component: ResultFilesPracticeComponent;
  let fixture: ComponentFixture<ResultFilesPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultFilesPracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultFilesPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
