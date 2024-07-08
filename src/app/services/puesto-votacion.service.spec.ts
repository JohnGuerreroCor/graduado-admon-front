import { TestBed } from '@angular/core/testing';

import { PuestoVotacionService } from './puesto-votacion.service';

describe('PuestoVotacionService', () => {
  let service: PuestoVotacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestoVotacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
