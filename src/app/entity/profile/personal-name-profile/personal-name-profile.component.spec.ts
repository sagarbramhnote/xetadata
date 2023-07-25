import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalNameProfileComponent } from './personal-name-profile.component';

describe('PersonalNameComponent', () => {
  let component: PersonalNameProfileComponent;
  let fixture: ComponentFixture<PersonalNameProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalNameProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalNameProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
