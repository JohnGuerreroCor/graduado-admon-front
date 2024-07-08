import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePerfilProfesionalComponent } from './reporte-perfil-profesional.component';

describe('ReportePerfilProfesionalComponent', () => {
  let component: ReportePerfilProfesionalComponent;
  let fixture: ComponentFixture<ReportePerfilProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePerfilProfesionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportePerfilProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
