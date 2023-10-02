import { TestBed } from '@angular/core/testing';

import { CrearDomicilioService } from './crear-domicilio.service';

describe('CrearDomicilioService', () => {
  let service: CrearDomicilioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearDomicilioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
