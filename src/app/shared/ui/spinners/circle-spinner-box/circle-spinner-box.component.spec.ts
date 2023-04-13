import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleSpinnerBoxComponent } from './circle-spinner-box.component';

describe('CircleSpinnerBoxComponent', () => {
  let component: CircleSpinnerBoxComponent;
  let fixture: ComponentFixture<CircleSpinnerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleSpinnerBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleSpinnerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
