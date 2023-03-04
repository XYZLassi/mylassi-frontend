import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateArticlePageComponent } from './admin-create-article-page.component';

describe('AdminCreatePostPageComponent', () => {
  let component: AdminCreateArticlePageComponent;
  let fixture: ComponentFixture<AdminCreateArticlePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateArticlePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateArticlePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
