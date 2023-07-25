import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIDProfileComponent } from './email-id-profile.component';

describe('EmailIDComponent', () => {
  let component: EmailIDProfileComponent;
  let fixture: ComponentFixture<EmailIDProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailIDProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailIDProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
