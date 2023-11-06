import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VischekFractalsPageComponent } from './fractals-page.component';

describe('FractalsPageComponent', () => {
  let component: VischekFractalsPageComponent;
  let fixture: ComponentFixture<VischekFractalsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VischekFractalsPageComponent]
    });
    fixture = TestBed.createComponent(VischekFractalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
