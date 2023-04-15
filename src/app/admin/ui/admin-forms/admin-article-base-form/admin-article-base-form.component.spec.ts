import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleBaseFormComponent } from './admin-article-base-form.component';

describe('AdminArticleBaseFormComponent', () => {
  let component: AdminArticleBaseFormComponent;
  let fixture: ComponentFixture<AdminArticleBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticleBaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticleBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
