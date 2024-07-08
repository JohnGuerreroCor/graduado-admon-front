import { TestBed } from '@angular/core/testing';

import { TasaGraduacionService } from './tasa-graduacion.service';

describe('TasaGraduacionService', () => {
  let service: TasaGraduacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasaGraduacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
