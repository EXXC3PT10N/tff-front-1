import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAskComponent } from './my-ask.component';

describe('MyAskComponent', () => {
  let component: MyAskComponent;
  let fixture: ComponentFixture<MyAskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
