import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSinglePageLayoutComponent } from './full-single-page-layout.component';

describe('FullSinglePageLayoutComponent', () => {
  let component: FullSinglePageLayoutComponent;
  let fixture: ComponentFixture<FullSinglePageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullSinglePageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullSinglePageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
