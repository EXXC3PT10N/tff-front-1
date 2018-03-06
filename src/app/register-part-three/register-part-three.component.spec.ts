import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartThreeComponent } from './register-part-three.component';

describe('RegisterPartThreeComponent', () => {
  let component: RegisterPartThreeComponent;
  let fixture: ComponentFixture<RegisterPartThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
