import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsumptionComponent } from './edit-consumption.component';

describe('EditConsumptionComponent', () => {
  let component: EditConsumptionComponent;
  let fixture: ComponentFixture<EditConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
