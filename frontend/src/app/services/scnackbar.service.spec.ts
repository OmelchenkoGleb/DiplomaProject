import { TestBed } from '@angular/core/testing';

import { ScnackbarService } from './scnackbar.service';

describe('ScnackbarService', () => {
  let service: ScnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
