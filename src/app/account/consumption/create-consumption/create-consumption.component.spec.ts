import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsumptionComponent } from './create-consumption.component';

describe('CreateConsumptionComponent', () => {
  let component: CreateConsumptionComponent;
  let fixture: ComponentFixture<CreateConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
