import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoVotacionComponent } from './puesto-votacion.component';

describe('PuestoVotacionComponent', () => {
  let component: PuestoVotacionComponent;
  let fixture: ComponentFixture<PuestoVotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuestoVotacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuestoVotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
