import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectChequeComponent } from './select-cheque.component';

describe('SelectChequeComponent', () => {
  let component: SelectChequeComponent;
  let fixture: ComponentFixture<SelectChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
