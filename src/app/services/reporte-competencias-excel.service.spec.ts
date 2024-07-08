import { TestBed } from '@angular/core/testing';

import { ReporteCompetenciasExcelService } from './reporte-competencias-excel.service';

describe('ReporteCompetenciasExcelService', () => {
  let service: ReporteCompetenciasExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteCompetenciasExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
