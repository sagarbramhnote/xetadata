import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptsRegisterComponent } from './recipts-register.component';

describe('ReciptsRegisterComponent', () => {
  let component: ReciptsRegisterComponent;
  let fixture: ComponentFixture<ReciptsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptsRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
