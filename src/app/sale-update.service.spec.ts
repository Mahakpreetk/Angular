import { TestBed } from '@angular/core/testing';

import { SaleUpdateService } from './sale-update.service';

describe('SaleUpdateService', () => {
  let service: SaleUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
