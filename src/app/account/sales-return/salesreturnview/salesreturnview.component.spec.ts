import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreturnviewComponent } from './salesreturnview.component';

describe('SalesreturnviewComponent', () => {
  let component: SalesreturnviewComponent;
  let fixture: ComponentFixture<SalesreturnviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesreturnviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesreturnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
