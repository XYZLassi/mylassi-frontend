import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsideLayoutComponent } from './admin-inside-layout.component';

describe('AdminInsideLayoutComponent', () => {
  let component: AdminInsideLayoutComponent;
  let fixture: ComponentFixture<AdminInsideLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsideLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInsideLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
