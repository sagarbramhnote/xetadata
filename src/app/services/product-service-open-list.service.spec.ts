import { TestBed } from '@angular/core/testing';

import { ProductServiceOpenListService } from './product-service-open-list.service';

describe('ProductServiceOpenListService', () => {
  let service: ProductServiceOpenListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServiceOpenListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
