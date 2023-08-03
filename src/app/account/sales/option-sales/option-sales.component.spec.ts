import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSalesComponent } from './option-sales.component';

describe('OptionSalesComponent', () => {
  let component: OptionSalesComponent;
  let fixture: ComponentFixture<OptionSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
