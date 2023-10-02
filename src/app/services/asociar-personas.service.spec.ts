import { TestBed } from '@angular/core/testing';

import { AsociarPersonasService } from './asociar-personas.service';

describe('AsociarPersonasService', () => {
  let service: AsociarPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsociarPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
