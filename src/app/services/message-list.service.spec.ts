import { TestBed } from '@angular/core/testing';

import { MessageListService } from './message-list.service';

describe('MessageListService', () => {
  let service: MessageListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
