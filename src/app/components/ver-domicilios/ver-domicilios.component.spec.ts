import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDomiciliosComponent } from './ver-domicilios.component';

describe('VerDomiciliosComponent', () => {
  let component: VerDomiciliosComponent;
  let fixture: ComponentFixture<VerDomiciliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDomiciliosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDomiciliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
