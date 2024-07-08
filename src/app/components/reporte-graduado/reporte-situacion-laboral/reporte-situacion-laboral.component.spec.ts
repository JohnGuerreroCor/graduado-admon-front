import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSituacionLaboralComponent } from './reporte-situacion-laboral.component';

describe('ReporteSituacionLaboralComponent', () => {
  let component: ReporteSituacionLaboralComponent;
  let fixture: ComponentFixture<ReporteSituacionLaboralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteSituacionLaboralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSituacionLaboralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
