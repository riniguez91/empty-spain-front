import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisTextoComponent } from './analisis-texto.component';

describe('AnalisisTextoComponent', () => {
  let component: AnalisisTextoComponent;
  let fixture: ComponentFixture<AnalisisTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisTextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
