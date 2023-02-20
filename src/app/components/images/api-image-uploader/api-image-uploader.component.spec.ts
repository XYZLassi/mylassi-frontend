import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiImageUploaderComponent } from './api-image-uploader.component';

describe('ApiImageUploaderComponent', () => {
  let component: ApiImageUploaderComponent;
  let fixture: ComponentFixture<ApiImageUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiImageUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
