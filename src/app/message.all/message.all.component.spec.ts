import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Message.AllComponent } from './message.all.component';

describe('Message.AllComponent', () => {
  let component: Message.AllComponent;
  let fixture: ComponentFixture<Message.AllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Message.AllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Message.AllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
