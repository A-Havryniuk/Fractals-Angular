import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandelbrotLearnComponent } from './mandelbrot-learn.component';

describe('MandelbrotLearnComponent', () => {
  let component: MandelbrotLearnComponent;
  let fixture: ComponentFixture<MandelbrotLearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MandelbrotLearnComponent]
    });
    fixture = TestBed.createComponent(MandelbrotLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
