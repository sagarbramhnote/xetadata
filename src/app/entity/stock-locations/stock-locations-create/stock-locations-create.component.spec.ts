import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLocationsCreateComponent } from './stock-locations-create.component';

describe('StockLocationsCreateComponent', () => {
  let component: StockLocationsCreateComponent;
  let fixture: ComponentFixture<StockLocationsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLocationsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockLocationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
