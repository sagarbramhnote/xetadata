import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViwBankReconciliationComponent } from './viw-bank-reconciliation.component';

describe('ViwBankReconciliationComponent', () => {
  let component: ViwBankReconciliationComponent;
  let fixture: ComponentFixture<ViwBankReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViwBankReconciliationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViwBankReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
