import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDomicilioComponent } from './modificar-domicilio.component';

describe('ModificarDomicilioComponent', () => {
  let component: ModificarDomicilioComponent;
  let fixture: ComponentFixture<ModificarDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarDomicilioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
