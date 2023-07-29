import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FialAccountComponent } from './fial-account.component';

describe('FialAccountComponent', () => {
  let component: FialAccountComponent;
  let fixture: ComponentFixture<FialAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FialAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FialAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
