import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenPc3Component } from './examen-pc3.component';

describe('ExamenPc3Component', () => {
  let component: ExamenPc3Component;
  let fixture: ComponentFixture<ExamenPc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenPc3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenPc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
