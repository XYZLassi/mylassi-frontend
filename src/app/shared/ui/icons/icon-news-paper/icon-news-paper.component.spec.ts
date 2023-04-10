import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNewsPaperComponent } from './icon-news-paper.component';

describe('IconNewsPaperComponent', () => {
  let component: IconNewsPaperComponent;
  let fixture: ComponentFixture<IconNewsPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconNewsPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconNewsPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
