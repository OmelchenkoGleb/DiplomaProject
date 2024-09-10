import { TestBed } from '@angular/core/testing';

import { DirectionofthesisService } from './directionofthesis.service';

describe('DirectionofthesisService', () => {
  let service: DirectionofthesisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionofthesisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
