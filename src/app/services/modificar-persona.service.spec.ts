import { TestBed } from '@angular/core/testing';

import { ModificarPersonaService } from './modificar-persona.service';

describe('ModificarPersonaService', () => {
  let service: ModificarPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
