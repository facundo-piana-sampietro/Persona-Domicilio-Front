import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDomicilioComponent } from './crear-domicilio.component';

describe('CrearDomicilioComponent', () => {
  let component: CrearDomicilioComponent;
  let fixture: ComponentFixture<CrearDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDomicilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
