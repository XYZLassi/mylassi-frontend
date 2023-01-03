import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePageLayoutComponent } from './single-page-layout.component';

describe('SinglePageLayoutComponent', () => {
  let component: SinglePageLayoutComponent;
  let fixture: ComponentFixture<SinglePageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
