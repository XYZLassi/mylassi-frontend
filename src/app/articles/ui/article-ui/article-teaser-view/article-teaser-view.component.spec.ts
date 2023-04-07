import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTeaserViewComponent } from './article-teaser-view.component';

describe('ArticleTeaserViewComponent', () => {
  let component: ArticleTeaserViewComponent;
  let fixture: ComponentFixture<ArticleTeaserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTeaserViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTeaserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
