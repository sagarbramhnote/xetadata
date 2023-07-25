import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNameProfileComponent } from './company-name-profile.component';

describe('CompanyNameComponent', () => {
  let component: CompanyNameProfileComponent;
  let fixture: ComponentFixture<CompanyNameProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyNameProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyNameProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
