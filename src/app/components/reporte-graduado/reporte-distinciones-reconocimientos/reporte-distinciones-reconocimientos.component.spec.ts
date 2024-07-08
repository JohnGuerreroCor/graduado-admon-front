import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDistincionesReconocimientosComponent } from './reporte-distinciones-reconocimientos.component';

describe('ReporteDistincionesReconocimientosComponent', () => {
  let component: ReporteDistincionesReconocimientosComponent;
  let fixture: ComponentFixture<ReporteDistincionesReconocimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDistincionesReconocimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDistincionesReconocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
