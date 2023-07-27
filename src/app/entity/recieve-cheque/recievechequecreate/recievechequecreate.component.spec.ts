import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievechequecreateComponent } from './recievechequecreate.component';

describe('RecievechequecreateComponent', () => {
  let component: RecievechequecreateComponent;
  let fixture: ComponentFixture<RecievechequecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievechequecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecievechequecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
