import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleSpinnerComponent } from './circle-spinner.component';

describe('CircleSpinnerComponent', () => {
  let component: CircleSpinnerComponent;
  let fixture: ComponentFixture<CircleSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircleSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircleSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
