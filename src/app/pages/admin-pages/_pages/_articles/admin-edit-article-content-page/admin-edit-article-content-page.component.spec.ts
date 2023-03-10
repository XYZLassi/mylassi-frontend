import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditArticleContentPageComponent } from './admin-edit-article-content-page.component';

describe('AdminEditArticleContentPageComponent', () => {
  let component: AdminEditArticleContentPageComponent;
  let fixture: ComponentFixture<AdminEditArticleContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditArticleContentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditArticleContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
