import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleContentsListComponent } from './article-contents-list.component';

describe('ArticleContentsListComponent', () => {
  let component: ArticleContentsListComponent;
  let fixture: ComponentFixture<ArticleContentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleContentsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleContentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
