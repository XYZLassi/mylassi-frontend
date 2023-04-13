import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesListTableComponent } from './admin-articles-list-table.component';

describe('AdminArticlesListTableComponent', () => {
  let component: AdminArticlesListTableComponent;
  let fixture: ComponentFixture<AdminArticlesListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArticlesListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminArticlesListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
