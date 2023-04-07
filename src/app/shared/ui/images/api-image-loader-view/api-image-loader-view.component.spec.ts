import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiImageLoaderViewComponent } from './api-image-loader-view.component';

describe('ApiImageLoaderViewComponent', () => {
  let component: ApiImageLoaderViewComponent;
  let fixture: ComponentFixture<ApiImageLoaderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiImageLoaderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiImageLoaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
