import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMsComponent } from './uoms.component';

describe('UOMsComponent', () => {
  let component: UOMsComponent;
  let fixture: ComponentFixture<UOMsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UOMsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UOMsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
