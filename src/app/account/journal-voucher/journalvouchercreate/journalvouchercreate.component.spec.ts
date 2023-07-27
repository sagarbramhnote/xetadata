import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalvouchercreateComponent } from './journalvouchercreate.component';

describe('JournalvouchercreateComponent', () => {
  let component: JournalvouchercreateComponent;
  let fixture: ComponentFixture<JournalvouchercreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalvouchercreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalvouchercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
