import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAccountComponent } from './party-account.component';

describe('PartyAccountComponent', () => {
  let component: PartyAccountComponent;
  let fixture: ComponentFixture<PartyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
