import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleHeaderContentViewComponent } from './article-header-content-view.component';

describe('ArticleHeaderContentViewComponent', () => {
  let component: ArticleHeaderContentViewComponent;
  let fixture: ComponentFixture<ArticleHeaderContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleHeaderContentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleHeaderContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
