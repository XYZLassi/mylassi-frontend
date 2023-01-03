import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WipBannerViewComponent } from './wip-banner-view.component';

describe('WipBannerViewComponent', () => {
  let component: WipBannerViewComponent;
  let fixture: ComponentFixture<WipBannerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WipBannerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WipBannerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
