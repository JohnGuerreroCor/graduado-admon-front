import { TestBed } from '@angular/core/testing';

import { ReporteEgresadoEstudioRealizadoExcelService } from './reporte-egresado-estudio-realizado-excel.service';

describe('ReporteEgresadoEstudioRealizadoExcelService', () => {
  let service: ReporteEgresadoEstudioRealizadoExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresadoEstudioRealizadoExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
