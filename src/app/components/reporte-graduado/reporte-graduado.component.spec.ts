import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGraduadoComponent } from './reporte-graduado.component';

describe('ReporteGraduadoComponent', () => {
  let component: ReporteGraduadoComponent;
  let fixture: ComponentFixture<ReporteGraduadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGraduadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteGraduadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
