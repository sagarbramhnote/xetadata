import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartyAccountComponent } from './create-party-account.component';

describe('CreatePartyAccountComponent', () => {
  let component: CreatePartyAccountComponent;
  let fixture: ComponentFixture<CreatePartyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
