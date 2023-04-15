import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesEditPageComponent } from './admin-articles-edit-page.component';

describe('AdminArticlesEditPageComponent', () => {
  let component: AdminArticlesEditPageComponent;
  let fixture: ComponentFixture<AdminArticlesEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticlesEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlesEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
