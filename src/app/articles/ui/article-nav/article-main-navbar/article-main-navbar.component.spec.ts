import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMainNavbarComponent } from './article-main-navbar.component';

describe('ArticleMainNavbarComponent', () => {
  let component: ArticleMainNavbarComponent;
  let fixture: ComponentFixture<ArticleMainNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleMainNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleMainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
