import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneProfileComponent } from './telephone-profile.component';

describe('TelephoneComponent', () => {
  let component: TelephoneProfileComponent;
  let fixture: ComponentFixture<TelephoneProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelephoneProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelephoneProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
