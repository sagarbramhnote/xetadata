import { TestBed } from '@angular/core/testing';

import { XetaPeopleListService } from './xeta-people-list.service';

describe('XetaPeopleListService', () => {
  let service: XetaPeopleListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XetaPeopleListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
