import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsRegisterComponent } from './payments-register.component';

describe('PaymentsRegisterComponent', () => {
  let component: PaymentsRegisterComponent;
  let fixture: ComponentFixture<PaymentsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
