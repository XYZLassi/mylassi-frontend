import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesCreatePageComponent } from './admin-articles-create-page.component';

describe('AdminArticlesCreatePageComponent', () => {
  let component: AdminArticlesCreatePageComponent;
  let fixture: ComponentFixture<AdminArticlesCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticlesCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
