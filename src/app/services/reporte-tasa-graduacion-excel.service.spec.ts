import { TestBed } from '@angular/core/testing';

import { ReporteTasaGraduacionExcelService } from './reporte-tasa-graduacion-excel.service';

describe('ReporteTasaGraduacionExcelService', () => {
  let service: ReporteTasaGraduacionExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteTasaGraduacionExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
