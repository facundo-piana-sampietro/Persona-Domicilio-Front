import { TestBed } from '@angular/core/testing';

import { AsociarDomiciliosService } from './asociar-domicilios.service';

describe('AsociarDomiciliosService', () => {
  let service: AsociarDomiciliosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsociarDomiciliosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
