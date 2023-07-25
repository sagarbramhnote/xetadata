import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtIDProfileComponent } from './govt-id-profile.component';

describe('GovtIDComponent', () => {
  let component: GovtIDProfileComponent;
  let fixture: ComponentFixture<GovtIDProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtIDProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovtIDProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
