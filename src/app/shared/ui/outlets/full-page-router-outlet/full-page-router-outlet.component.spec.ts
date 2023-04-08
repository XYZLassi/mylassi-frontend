import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullPageRouterOutletComponent } from './full-page-router-outlet.component';

describe('FullPageRouterOutletComponent', () => {
  let component: FullPageRouterOutletComponent;
  let fixture: ComponentFixture<FullPageRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullPageRouterOutletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullPageRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
