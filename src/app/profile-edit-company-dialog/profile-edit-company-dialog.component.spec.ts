import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditCompanyDialogComponent } from './profile-edit-company-dialog.component';

describe('ProfileEditCompanyDialogComponent', () => {
  let component: ProfileEditCompanyDialogComponent;
  let fixture: ComponentFixture<ProfileEditCompanyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
