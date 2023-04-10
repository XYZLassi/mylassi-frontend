import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesIndexPageComponent } from './admin-articles-index-page.component';

describe('AdminArticlesIndexPageComponent', () => {
  let component: AdminArticlesIndexPageComponent;
  let fixture: ComponentFixture<AdminArticlesIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticlesIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlesIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
