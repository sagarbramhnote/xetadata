import { TestBed } from '@angular/core/testing';

import { ChequeByNumberService } from './cheque-by-number.service';

describe('ChequeByNumberService', () => {
  let service: ChequeByNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequeByNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
