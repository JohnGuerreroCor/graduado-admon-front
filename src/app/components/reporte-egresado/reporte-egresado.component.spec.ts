import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEgresadoComponent } from './reporte-egresado.component';

describe('ReporteEgresadoComponent', () => {
  let component: ReporteEgresadoComponent;
  let fixture: ComponentFixture<ReporteEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
