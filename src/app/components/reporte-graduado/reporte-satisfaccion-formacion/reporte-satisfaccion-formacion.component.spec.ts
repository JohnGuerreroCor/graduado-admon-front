import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSatisfaccionFormacionComponent } from './reporte-satisfaccion-formacion.component';

describe('ReporteSatisfaccionFormacionComponent', () => {
  let component: ReporteSatisfaccionFormacionComponent;
  let fixture: ComponentFixture<ReporteSatisfaccionFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteSatisfaccionFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteSatisfaccionFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
