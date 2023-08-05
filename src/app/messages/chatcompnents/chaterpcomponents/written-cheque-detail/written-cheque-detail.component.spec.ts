import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenChequeDetailComponent } from './written-cheque-detail.component';

describe('WrittenChequeDetailComponent', () => {
  let component: WrittenChequeDetailComponent;
  let fixture: ComponentFixture<WrittenChequeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittenChequeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittenChequeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
