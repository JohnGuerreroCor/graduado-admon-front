import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasaGraduacionComponent } from './tasa-graduacion.component';

describe('TasaGraduacionComponent', () => {
  let component: TasaGraduacionComponent;
  let fixture: ComponentFixture<TasaGraduacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasaGraduacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasaGraduacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
