import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtIDComponent } from './govt-id.component';

describe('GovtIDComponent', () => {
  let component: GovtIDComponent;
  let fixture: ComponentFixture<GovtIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtIDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovtIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
