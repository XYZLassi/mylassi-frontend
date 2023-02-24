import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderBoxTextWithIconComponent } from './border-box-text-with-icon.component';

describe('BorderBoxTextWithIconComponent', () => {
  let component: BorderBoxTextWithIconComponent;
  let fixture: ComponentFixture<BorderBoxTextWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderBoxTextWithIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderBoxTextWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
