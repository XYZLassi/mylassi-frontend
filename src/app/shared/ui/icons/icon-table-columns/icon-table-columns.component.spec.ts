import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTableColumnsComponent } from './icon-table-columns.component';

describe('IconTableColumnsComponent', () => {
  let component: IconTableColumnsComponent;
  let fixture: ComponentFixture<IconTableColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTableColumnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
