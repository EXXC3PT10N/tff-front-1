import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateCompanyDialogComponent } from './profile-create-company-dialog.component';

describe('ProfileCreateCompanyDialogComponent', () => {
  let component: ProfileCreateCompanyDialogComponent;
  let fixture: ComponentFixture<ProfileCreateCompanyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCreateCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCreateCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
