import { TestBed } from '@angular/core/testing';

import { LatestReceiversService } from './latest-receivers.service';

describe('LatestReceiversService', () => {
  let service: LatestReceiversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatestReceiversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
