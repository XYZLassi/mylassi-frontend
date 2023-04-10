import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleCreateFormComponent } from './admin-article-create-form.component';

describe('AdminArticleCreateFormComponent', () => {
  let component: AdminArticleCreateFormComponent;
  let fixture: ComponentFixture<AdminArticleCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticleCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticleCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
