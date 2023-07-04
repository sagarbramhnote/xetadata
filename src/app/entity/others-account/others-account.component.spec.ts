import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersAccountComponent } from './others-account.component';

describe('OthersAccountComponent', () => {
  let component: OthersAccountComponent;
  let fixture: ComponentFixture<OthersAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OthersAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
