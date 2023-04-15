import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleEditFormComponent } from './admin-article-edit-form.component';

describe('AdminArticleEditFormComponent', () => {
  let component: AdminArticleEditFormComponent;
  let fixture: ComponentFixture<AdminArticleEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticleEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticleEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
