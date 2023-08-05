import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingStockItemListComponent } from './closing-stock-item-list.component';

describe('ClosingStockItemListComponent', () => {
  let component: ClosingStockItemListComponent;
  let fixture: ComponentFixture<ClosingStockItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingStockItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosingStockItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
