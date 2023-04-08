import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRouterOutletComponent } from './article-router-outlet.component';

describe('ArticleRouterOutletComponent', () => {
  let component: ArticleRouterOutletComponent;
  let fixture: ComponentFixture<ArticleRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleRouterOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
