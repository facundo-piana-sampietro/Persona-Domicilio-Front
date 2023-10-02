import { TestBed } from '@angular/core/testing';

import { VerPersonasService } from './ver-personas.service';

describe('VerPersonasService', () => {
  let service: VerPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
