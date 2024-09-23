import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewTopicProposalComponent } from './teacher-view-topic-proposal.component';

describe('TeacherViewTopicProposalComponent', () => {
  let component: TeacherViewTopicProposalComponent;
  let fixture: ComponentFixture<TeacherViewTopicProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherViewTopicProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewTopicProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
