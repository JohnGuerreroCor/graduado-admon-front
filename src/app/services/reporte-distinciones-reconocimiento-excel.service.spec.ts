import { TestBed } from '@angular/core/testing';

import { ReporteDistincionesReconocimientoExcelService } from './reporte-distinciones-reconocimiento-excel.service';

describe('ReporteDistincionesReconocimientoExcelService', () => {
  let service: ReporteDistincionesReconocimientoExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteDistincionesReconocimientoExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
