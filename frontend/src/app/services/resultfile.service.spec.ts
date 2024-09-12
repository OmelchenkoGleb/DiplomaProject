import { TestBed } from '@angular/core/testing';

import { ResultfileService } from './resultfile.service';

describe('ResultfileService', () => {
  let service: ResultfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
