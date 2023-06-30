import { TestBed } from '@angular/core/testing';

import { RecipientListService } from './recipient-list.service';

describe('RecipientListService', () => {
  let service: RecipientListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipientListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
