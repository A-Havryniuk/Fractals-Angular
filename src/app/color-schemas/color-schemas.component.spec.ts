import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemasComponent } from './color-schemas.component';

describe('ColorSchemasComponent', () => {
  let component: ColorSchemasComponent;
  let fixture: ComponentFixture<ColorSchemasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSchemasComponent]
    });
    fixture = TestBed.createComponent(ColorSchemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
