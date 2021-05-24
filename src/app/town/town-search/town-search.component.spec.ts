import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownSearchComponent } from './town-search.component';

describe('TownSearchComponent', () => {
  let component: TownSearchComponent;
  let fixture: ComponentFixture<TownSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
