import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTeaserListComponent } from './article-teaser-list.component';

describe('ArticleTeaserListComponent', () => {
  let component: ArticleTeaserListComponent;
  let fixture: ComponentFixture<ArticleTeaserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleTeaserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleTeaserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
