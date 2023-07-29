import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoiceAgeingComponent } from './sales-invoice-ageing.component';

describe('SalesInvoiceAgeingComponent', () => {
  let component: SalesInvoiceAgeingComponent;
  let fixture: ComponentFixture<SalesInvoiceAgeingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInvoiceAgeingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInvoiceAgeingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
