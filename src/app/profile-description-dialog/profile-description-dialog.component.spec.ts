import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDescriptionDialogComponent } from './profile-description-dialog.component';

describe('ProfileDescriptionDialogComponent', () => {
  let component: ProfileDescriptionDialogComponent;
  let fixture: ComponentFixture<ProfileDescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
