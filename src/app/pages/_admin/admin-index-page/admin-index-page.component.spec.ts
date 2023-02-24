import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndexPageComponent } from './admin-index-page.component';

describe('AdminIndexPageComponent', () => {
  let component: AdminIndexPageComponent;
  let fixture: ComponentFixture<AdminIndexPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIndexPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIndexPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
