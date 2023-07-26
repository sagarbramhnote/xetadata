import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittenchequecreateComponent } from './writtenchequecreate.component';

describe('WrittenchequecreateComponent', () => {
  let component: WrittenchequecreateComponent;
  let fixture: ComponentFixture<WrittenchequecreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrittenchequecreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrittenchequecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
