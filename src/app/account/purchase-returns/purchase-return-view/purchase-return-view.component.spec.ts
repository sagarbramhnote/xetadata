import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnViewComponent } from './purchase-return-view.component';

describe('PurchaseReturnViewComponent', () => {
  let component: PurchaseReturnViewComponent;
  let fixture: ComponentFixture<PurchaseReturnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseReturnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
