import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Message.WithComponent } from './message.with.component';

describe('Message.WithComponent', () => {
  let component: Message.WithComponent;
  let fixture: ComponentFixture<Message.WithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Message.WithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Message.WithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
