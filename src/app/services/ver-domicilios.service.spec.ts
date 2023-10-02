import { TestBed } from '@angular/core/testing';

import { VerDomiciliosService } from './ver-domicilios.service';

describe('VerDomiciliosService', () => {
  let service: VerDomiciliosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerDomiciliosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
