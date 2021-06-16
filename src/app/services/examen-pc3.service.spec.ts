import { TestBed } from '@angular/core/testing';

import { ExamenPc3Service } from './examen-pc3.service';

describe('ExamenPc3Service', () => {
  let service: ExamenPc3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenPc3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
