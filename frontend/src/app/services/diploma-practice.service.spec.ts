import { TestBed } from '@angular/core/testing';

import { DiplomaPracticeService } from './diploma-practice.service';

describe('DiplomaPracticeService', () => {
  let service: DiplomaPracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomaPracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
