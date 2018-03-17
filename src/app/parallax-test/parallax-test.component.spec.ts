import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParallaxTestComponent } from './parallax-test.component';

describe('ParallaxTestComponent', () => {
  let component: ParallaxTestComponent;
  let fixture: ComponentFixture<ParallaxTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParallaxTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParallaxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
