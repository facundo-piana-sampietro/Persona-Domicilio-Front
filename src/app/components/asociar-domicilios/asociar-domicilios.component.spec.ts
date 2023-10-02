import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarDomiciliosComponent } from './asociar-domicilios.component';

describe('AsociarDomiciliosComponent', () => {
  let component: AsociarDomiciliosComponent;
  let fixture: ComponentFixture<AsociarDomiciliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarDomiciliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarDomiciliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
