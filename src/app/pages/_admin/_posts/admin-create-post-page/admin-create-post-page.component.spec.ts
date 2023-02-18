import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePostPageComponent } from './admin-create-post-page.component';

describe('AdminCreatePostPageComponent', () => {
  let component: AdminCreatePostPageComponent;
  let fixture: ComponentFixture<AdminCreatePostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreatePostPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
