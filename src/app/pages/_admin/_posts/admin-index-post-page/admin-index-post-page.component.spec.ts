import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndexPostPageComponent } from './admin-index-post-page.component';

describe('AdminIndexPostPageComponent', () => {
  let component: AdminIndexPostPageComponent;
  let fixture: ComponentFixture<AdminIndexPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIndexPostPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIndexPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
