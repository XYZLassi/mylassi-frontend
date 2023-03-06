import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateArticleContentPageComponent } from './admin-create-article-content-page.component';

describe('AdminCreateArticleContentPageComponent', () => {
  let component: AdminCreateArticleContentPageComponent;
  let fixture: ComponentFixture<AdminCreateArticleContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateArticleContentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateArticleContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
