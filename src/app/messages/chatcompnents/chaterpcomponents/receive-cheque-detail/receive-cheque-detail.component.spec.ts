import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveChequeDetailComponent } from './receive-cheque-detail.component';

describe('ReceiveChequeDetailComponent', () => {
  let component: ReceiveChequeDetailComponent;
  let fixture: ComponentFixture<ReceiveChequeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveChequeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveChequeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
