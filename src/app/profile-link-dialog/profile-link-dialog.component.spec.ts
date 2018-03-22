import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLinkDialogComponent } from './profile-link-dialog.component';

describe('ProfileLinkDialogComponent', () => {
  let component: ProfileLinkDialogComponent;
  let fixture: ComponentFixture<ProfileLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
