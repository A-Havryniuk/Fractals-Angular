import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffineTransformationComponent } from './affine-transformation.component';

describe('AffineTransformationComponent', () => {
  let component: AffineTransformationComponent;
  let fixture: ComponentFixture<AffineTransformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffineTransformationComponent]
    });
    fixture = TestBed.createComponent(AffineTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
