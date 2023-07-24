import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomsCreateComponent } from './uoms-create.component';

describe('UomsCreateComponent', () => {
  let component: UomsCreateComponent;
  let fixture: ComponentFixture<UomsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UomsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
