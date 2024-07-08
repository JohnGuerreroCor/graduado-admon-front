import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesEgresadoComponent } from './datos-personales-egresado.component';

describe('DatosPersonalesEgresadoComponent', () => {
  let component: DatosPersonalesEgresadoComponent;
  let fixture: ComponentFixture<DatosPersonalesEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPersonalesEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPersonalesEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
