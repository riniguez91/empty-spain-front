import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PueblosComponent } from './pueblos.component';

describe('PueblosComponent', () => {
  let component: PueblosComponent;
  let fixture: ComponentFixture<PueblosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PueblosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PueblosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
