import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleShowPageComponent } from './article-show-page.component';

describe('ArticleShowPageComponent', () => {
  let component: ArticleShowPageComponent;
  let fixture: ComponentFixture<ArticleShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleShowPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
