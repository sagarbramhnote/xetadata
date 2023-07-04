import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveChequeComponent } from './recieve-cheque.component';

describe('RecieveChequeComponent', () => {
  let component: RecieveChequeComponent;
  let fixture: ComponentFixture<RecieveChequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieveChequeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieveChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
