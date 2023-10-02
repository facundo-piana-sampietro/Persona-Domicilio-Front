import { TestBed } from '@angular/core/testing';

import { CrearPersonaService } from './crear-persona.service';

describe('CrearPersonaService', () => {
  let service: CrearPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
