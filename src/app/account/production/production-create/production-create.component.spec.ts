import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCreateComponent } from './production-create.component';

describe('ProductionCreateComponent', () => {
  let component: ProductionCreateComponent;
  let fixture: ComponentFixture<ProductionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
