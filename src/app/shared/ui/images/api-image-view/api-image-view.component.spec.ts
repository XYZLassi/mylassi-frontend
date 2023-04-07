import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiImageViewComponent } from './api-image-view.component';

describe('ApiImageViewComponent', () => {
  let component: ApiImageViewComponent;
  let fixture: ComponentFixture<ApiImageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiImageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
