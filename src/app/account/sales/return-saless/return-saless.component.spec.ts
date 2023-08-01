import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnSalessComponent } from './return-saless.component';

describe('ReturnSalessComponent', () => {
  let component: ReturnSalessComponent;
  let fixture: ComponentFixture<ReturnSalessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnSalessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnSalessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
