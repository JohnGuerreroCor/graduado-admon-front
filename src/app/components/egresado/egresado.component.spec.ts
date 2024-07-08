import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresadoComponent } from './egresado.component';

describe('EgresadoComponent', () => {
  let component: EgresadoComponent;
  let fixture: ComponentFixture<EgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
