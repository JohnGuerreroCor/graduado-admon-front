import { TestBed } from '@angular/core/testing';

import { ReporteEgresadoIdiomaExcelService } from './reporte-egresado-idioma-excel.service';

describe('ReporteEgresadoIdiomaExcelService', () => {
  let service: ReporteEgresadoIdiomaExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresadoIdiomaExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
