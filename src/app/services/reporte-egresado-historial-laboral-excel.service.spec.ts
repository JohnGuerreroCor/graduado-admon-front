import { TestBed } from '@angular/core/testing';

import { ReporteEgresadoHistorialLaboralExcelService } from './reporte-egresado-historial-laboral-excel.service';

describe('ReporteEgresadoHistorialLaboralExcelService', () => {
  let service: ReporteEgresadoHistorialLaboralExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresadoHistorialLaboralExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
