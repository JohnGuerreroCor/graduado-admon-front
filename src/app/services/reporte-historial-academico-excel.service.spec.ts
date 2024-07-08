import { TestBed } from '@angular/core/testing';

import { ReporteHistorialAcademicoExcelService } from './reporte-historial-academico-excel.service';

describe('ReporteHistorialAcademicoExcelService', () => {
  let service: ReporteHistorialAcademicoExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteHistorialAcademicoExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
