import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCityDialogComponent } from './profile-city-dialog.component';

describe('ProfileCityDialogComponent', () => {
  let component: ProfileCityDialogComponent;
  let fixture: ComponentFixture<ProfileCityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
