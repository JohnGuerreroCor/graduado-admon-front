import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInformacionAcademicaComponent } from './reporte-informacion-academica.component';

describe('ReporteInformacionAcademicaComponent', () => {
  let component: ReporteInformacionAcademicaComponent;
  let fixture: ComponentFixture<ReporteInformacionAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteInformacionAcademicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteInformacionAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
