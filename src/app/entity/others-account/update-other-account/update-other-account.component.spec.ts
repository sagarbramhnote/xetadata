import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOtherAccountComponent } from './update-other-account.component';

describe('UpdateOtherAccountComponent', () => {
  let component: UpdateOtherAccountComponent;
  let fixture: ComponentFixture<UpdateOtherAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOtherAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOtherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
