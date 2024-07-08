import { TestBed } from '@angular/core/testing';

import { ReportePuestoVotacionExcelService } from './reporte-puesto-votacion-excel.service';

describe('ReportePuestoVotacionExcelService', () => {
  let service: ReportePuestoVotacionExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportePuestoVotacionExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
