import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPartyAccountComponent } from './access-party-account.component';

describe('AccessPartyAccountComponent', () => {
  let component: AccessPartyAccountComponent;
  let fixture: ComponentFixture<AccessPartyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPartyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessPartyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
