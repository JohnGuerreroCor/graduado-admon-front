import { TestBed } from '@angular/core/testing';

import { ReporteEgresadoPerfilProfesionalExcelService } from './reporte-egresado-perfil-profesional-excel.service';

describe('ReporteEgresadoPerfilProfesionalExcelService', () => {
  let service: ReporteEgresadoPerfilProfesionalExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresadoPerfilProfesionalExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
