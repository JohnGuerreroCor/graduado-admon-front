import { TestBed } from '@angular/core/testing';

import { ReporteEgresadoHabilidadesInformaticasExcelService } from './reporte-egresado-habilidades-informaticas-excel.service';

describe('ReporteEgresadoHabilidadesInformaticasExcelService', () => {
  let service: ReporteEgresadoHabilidadesInformaticasExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresadoHabilidadesInformaticasExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
