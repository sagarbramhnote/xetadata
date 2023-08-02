import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePurchaseReturnComponent } from './purchase-purchase-return.component';

describe('PurchasePurchaseReturnComponent', () => {
  let component: PurchasePurchaseReturnComponent;
  let fixture: ComponentFixture<PurchasePurchaseReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePurchaseReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
