import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferregisterComponent } from './transferregister.component';

describe('TransferregisterComponent', () => {
  let component: TransferregisterComponent;
  let fixture: ComponentFixture<TransferregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferregisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
