import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExpectativasCapacitacionComponent } from './reporte-expectativas-capacitacion.component';

describe('ReporteExpectativasCapacitacionComponent', () => {
  let component: ReporteExpectativasCapacitacionComponent;
  let fixture: ComponentFixture<ReporteExpectativasCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExpectativasCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteExpectativasCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
