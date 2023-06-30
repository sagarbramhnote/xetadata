import { TestBed } from '@angular/core/testing';

import { SaveRecipientsService } from './save-recipients.service';

describe('SaveRecipientsService', () => {
  let service: SaveRecipientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveRecipientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
