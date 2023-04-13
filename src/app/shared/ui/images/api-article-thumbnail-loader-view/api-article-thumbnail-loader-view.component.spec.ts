import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiArticleThumbnailLoaderViewComponent } from './api-article-thumbnail-loader-view.component';

describe('ApiArticleThumbnailLoaderViewComponent', () => {
  let component: ApiArticleThumbnailLoaderViewComponent;
  let fixture: ComponentFixture<ApiArticleThumbnailLoaderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiArticleThumbnailLoaderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiArticleThumbnailLoaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
