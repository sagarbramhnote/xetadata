import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherAccountComponent } from './create-other-account.component';

describe('CreateOtherAccountComponent', () => {
  let component: CreateOtherAccountComponent;
  let fixture: ComponentFixture<CreateOtherAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOtherAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOtherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
