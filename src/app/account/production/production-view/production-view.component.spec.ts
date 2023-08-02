import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionViewComponent } from './production-view.component';

describe('ProductionViewComponent', () => {
  let component: ProductionViewComponent;
  let fixture: ComponentFixture<ProductionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
