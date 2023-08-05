import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaPersonReceiptVoucherComponent } from './via-person-receipt-voucher.component';

describe('ViaPersonReceiptVoucherComponent', () => {
  let component: ViaPersonReceiptVoucherComponent;
  let fixture: ComponentFixture<ViaPersonReceiptVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViaPersonReceiptVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViaPersonReceiptVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
