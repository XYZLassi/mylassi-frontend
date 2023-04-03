import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiFileImageSelectorViewComponent } from './api-file-image-selector-view.component';

describe('ApiFileImageSelectorViewComponent', () => {
  let component: ApiFileImageSelectorViewComponent;
  let fixture: ComponentFixture<ApiFileImageSelectorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiFileImageSelectorViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiFileImageSelectorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
