import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInvoiceSalesComponent } from './send-invoice-sales.component';

describe('SendInvoiceSalesComponent', () => {
  let component: SendInvoiceSalesComponent;
  let fixture: ComponentFixture<SendInvoiceSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendInvoiceSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendInvoiceSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
