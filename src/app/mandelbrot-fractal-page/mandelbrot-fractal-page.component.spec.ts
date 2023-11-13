import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandelbrotFractalPageComponent } from './mandelbrot-fractal-page.component';

describe('MandelbrotFractalPageComponent', () => {
  let component: MandelbrotFractalPageComponent;
  let fixture: ComponentFixture<MandelbrotFractalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MandelbrotFractalPageComponent]
    });
    fixture = TestBed.createComponent(MandelbrotFractalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
