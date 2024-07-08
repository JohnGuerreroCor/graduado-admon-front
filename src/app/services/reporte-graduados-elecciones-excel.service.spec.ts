import { TestBed } from '@angular/core/testing';

import { ReporteGraduadosEleccionesExcelService } from './reporte-graduados-elecciones-excel.service';

describe('ReporteGraduadosEleccionesExcelService', () => {
  let service: ReporteGraduadosEleccionesExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteGraduadosEleccionesExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
