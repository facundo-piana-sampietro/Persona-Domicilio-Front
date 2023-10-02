import { TestBed } from '@angular/core/testing';

import { DomicilioService } from './domicilio.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('DomicilioService', () => {
  let service: DomicilioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomicilioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
