import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingStockItemFormComponent } from './closing-stock-item-form.component';

describe('ClosingStockItemFormComponent', () => {
  let component: ClosingStockItemFormComponent;
  let fixture: ComponentFixture<ClosingStockItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingStockItemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingStockItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
