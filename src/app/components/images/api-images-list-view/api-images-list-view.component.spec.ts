import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiImagesListViewComponent } from './api-images-list-view.component';

describe('ApiImageGalleryViewComponent', () => {
  let component: ApiImagesListViewComponent;
  let fixture: ComponentFixture<ApiImagesListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiImagesListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiImagesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
