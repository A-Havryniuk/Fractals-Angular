import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicsekLearnComponent } from './vicsek-learn.component';

describe('VicsekLearnComponent', () => {
  let component: VicsekLearnComponent;
  let fixture: ComponentFixture<VicsekLearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VicsekLearnComponent]
    });
    fixture = TestBed.createComponent(VicsekLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
