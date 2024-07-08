import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteActivoComponent } from './estudiante-activo.component';

describe('EstudianteActivoComponent', () => {
  let component: EstudianteActivoComponent;
  let fixture: ComponentFixture<EstudianteActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudianteActivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudianteActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
