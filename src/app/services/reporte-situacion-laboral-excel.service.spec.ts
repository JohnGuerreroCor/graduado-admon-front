import { TestBed } from '@angular/core/testing';

import { ReporteSituacionLaboralExcelService } from './reporte-situacion-laboral-excel.service';

describe('ReporteSituacionLaboralExcelService', () => {
  let service: ReporteSituacionLaboralExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteSituacionLaboralExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
