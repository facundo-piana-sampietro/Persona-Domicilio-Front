import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarPersonasComponent } from './asociar-personas.component';

describe('AsociarPersonasComponent', () => {
  let component: AsociarPersonasComponent;
  let fixture: ComponentFixture<AsociarPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarPersonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
