import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalAddressProfileComponent } from './postal-address-profile.component';

describe('PostalAddressComponent', () => {
  let component: PostalAddressProfileComponent;
  let fixture: ComponentFixture<PostalAddressProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostalAddressProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostalAddressProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
