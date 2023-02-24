import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderBoxComponent } from './border-box.component';

describe('BorderBoxComponent', () => {
  let component: BorderBoxComponent;
  let fixture: ComponentFixture<BorderBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorderBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
