import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsUpdateComponent } from './contacts-update.component';

describe('ContactsUpdateComponent', () => {
  let component: ContactsUpdateComponent;
  let fixture: ComponentFixture<ContactsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
