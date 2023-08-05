import { TestBed } from '@angular/core/testing';

import { SaveOpeningBalancesService } from './save-opening-balances.service';

describe('SaveOpeningBalancesService', () => {
  let service: SaveOpeningBalancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveOpeningBalancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
