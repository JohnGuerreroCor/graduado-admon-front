import { TestBed } from '@angular/core/testing';

import { ReporteExpectativaCapacitacionExcelService } from './reporte-expectativa-capacitacion-excel.service';

describe('ReporteExpectativaCapacitacionExcelService', () => {
  let service: ReporteExpectativaCapacitacionExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteExpectativaCapacitacionExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
