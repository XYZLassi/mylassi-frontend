import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleContentViewComponent } from './article-content-view.component';

describe('ArticleContentViewComponent', () => {
  let component: ArticleContentViewComponent;
  let fixture: ComponentFixture<ArticleContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleContentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
