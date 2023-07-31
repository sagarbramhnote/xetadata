import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMovementRegisterComponent } from './item-movement-register.component';

describe('ItemMovementRegisterComponent', () => {
  let component: ItemMovementRegisterComponent;
  let fixture: ComponentFixture<ItemMovementRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMovementRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMovementRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
