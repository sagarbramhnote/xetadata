import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLevelCreateComponent } from './item-level-create.component';

describe('ItemLevelCreateComponent', () => {
  let component: ItemLevelCreateComponent;
  let fixture: ComponentFixture<ItemLevelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemLevelCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLevelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
