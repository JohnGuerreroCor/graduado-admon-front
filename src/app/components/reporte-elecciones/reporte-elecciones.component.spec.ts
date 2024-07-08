import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEleccionesComponent } from './reporte-elecciones.component';

describe('ReporteEleccionesComponent', () => {
  let component: ReporteEleccionesComponent;
  let fixture: ComponentFixture<ReporteEleccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEleccionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEleccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
