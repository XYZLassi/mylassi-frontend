import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditArticlePageComponent } from './admin-edit-article-page.component';

describe('AdminEditArticlePageComponent', () => {
  let component: AdminEditArticlePageComponent;
  let fixture: ComponentFixture<AdminEditArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditArticlePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
