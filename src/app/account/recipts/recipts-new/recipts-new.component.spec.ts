import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptsNewComponent } from './recipts-new.component';

describe('ReciptsNewComponent', () => {
  let component: ReciptsNewComponent;
  let fixture: ComponentFixture<ReciptsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
