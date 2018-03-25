import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAskSelectBidDialogComponent } from './my-ask-select-bid-dialog.component';

describe('MyAskSelectBidDialogComponent', () => {
  let component: MyAskSelectBidDialogComponent;
  let fixture: ComponentFixture<MyAskSelectBidDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAskSelectBidDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAskSelectBidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
