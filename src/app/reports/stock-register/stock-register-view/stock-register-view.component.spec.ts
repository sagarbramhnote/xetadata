import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockRegisterViewComponent } from './stock-register-view.component';

describe('StockRegisterViewComponent', () => {
  let component: StockRegisterViewComponent;
  let fixture: ComponentFixture<StockRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockRegisterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
