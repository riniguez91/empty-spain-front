import { TestBed } from '@angular/core/testing';

import { AnalisisSentimientoService } from './analisis-sentimiento.service';

describe('AnalisisSentimientoService', () => {
  let service: AnalisisSentimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisSentimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
