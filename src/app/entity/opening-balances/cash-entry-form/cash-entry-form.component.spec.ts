import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashEntryFormComponent } from './cash-entry-form.component';

describe('CashEntryFormComponent', () => {
  let component: CashEntryFormComponent;
  let fixture: ComponentFixture<CashEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashEntryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
