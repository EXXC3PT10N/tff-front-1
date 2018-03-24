import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrangerProfileRateDialogComponent } from './stranger-profile-rate-dialog.component';

describe('StrangerProfileRateDialogComponent', () => {
  let component: StrangerProfileRateDialogComponent;
  let fixture: ComponentFixture<StrangerProfileRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrangerProfileRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrangerProfileRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
