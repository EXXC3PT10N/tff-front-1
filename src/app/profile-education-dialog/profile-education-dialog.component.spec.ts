import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationDialogComponent } from './profile-education-dialog.component';

describe('ProfileEducationDialogComponent', () => {
  let component: ProfileEducationDialogComponent;
  let fixture: ComponentFixture<ProfileEducationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEducationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
