import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTextContentViewComponent } from './article-text-content-view.component';

describe('ArticleTextContentViewComponent', () => {
  let component: ArticleTextContentViewComponent;
  let fixture: ComponentFixture<ArticleTextContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTextContentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTextContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
