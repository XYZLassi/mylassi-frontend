import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndexArticlePageComponent } from './admin-index-article-page.component';

describe('AdminIndexPostPageComponent', () => {
  let component: AdminIndexArticlePageComponent;
  let fixture: ComponentFixture<AdminIndexArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIndexArticlePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIndexArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
