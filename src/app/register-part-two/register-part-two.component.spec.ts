import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartTwoComponent } from './register-part-two.component';

describe('RegisterPartTwoComponent', () => {
  let component: RegisterPartTwoComponent;
  let fixture: ComponentFixture<RegisterPartTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
