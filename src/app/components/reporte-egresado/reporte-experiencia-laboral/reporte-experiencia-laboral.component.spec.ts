import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExperienciaLaboralComponent } from './reporte-experiencia-laboral.component';

describe('ReporteExperienciaLaboralComponent', () => {
  let component: ReporteExperienciaLaboralComponent;
  let fixture: ComponentFixture<ReporteExperienciaLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExperienciaLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteExperienciaLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
