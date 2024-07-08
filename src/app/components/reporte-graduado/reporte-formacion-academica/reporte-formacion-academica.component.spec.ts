import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFormacionAcademicaComponent } from './reporte-formacion-academica.component';

describe('ReporteFormacionAcademicaComponent', () => {
  let component: ReporteFormacionAcademicaComponent;
  let fixture: ComponentFixture<ReporteFormacionAcademicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteFormacionAcademicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteFormacionAcademicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
