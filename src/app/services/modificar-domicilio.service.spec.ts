import { TestBed } from '@angular/core/testing';

import { ModificarDomicilioService } from './modificar-domicilio.service';

describe('ModificarDomicilioService', () => {
  let service: ModificarDomicilioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarDomicilioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
