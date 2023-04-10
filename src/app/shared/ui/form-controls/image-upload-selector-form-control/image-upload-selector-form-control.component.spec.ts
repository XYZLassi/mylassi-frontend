import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadSelectorFormControlComponent } from './image-upload-selector-form-control.component';

describe('ImageUploadSelectorFormControlComponent', () => {
  let component: ImageUploadSelectorFormControlComponent;
  let fixture: ComponentFixture<ImageUploadSelectorFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadSelectorFormControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadSelectorFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
