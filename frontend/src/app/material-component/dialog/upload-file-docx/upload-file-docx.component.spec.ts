import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDocxComponent } from './upload-file-docx.component';

describe('UploadFileDocxComponent', () => {
  let component: UploadFileDocxComponent;
  let fixture: ComponentFixture<UploadFileDocxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadFileDocxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileDocxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
