import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleContentEditFormComponent } from './article-content-edit-form.component';

describe('ArticleContentEditFormComponent', () => {
  let component: ArticleContentEditFormComponent;
  let fixture: ComponentFixture<ArticleContentEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleContentEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleContentEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
