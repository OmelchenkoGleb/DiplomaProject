import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionofthesisComponent } from './directionofthesis.component';

describe('DirectionofthesisComponent', () => {
  let component: DirectionofthesisComponent;
  let fixture: ComponentFixture<DirectionofthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectionofthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionofthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
