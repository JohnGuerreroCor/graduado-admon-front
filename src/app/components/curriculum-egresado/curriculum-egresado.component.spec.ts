import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumEgresadoComponent } from './curriculum-egresado.component';

describe('CurriculumEgresadoComponent', () => {
  let component: CurriculumEgresadoComponent;
  let fixture: ComponentFixture<CurriculumEgresadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurriculumEgresadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurriculumEgresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
