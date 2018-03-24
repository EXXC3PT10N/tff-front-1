import { TestBed, inject } from '@angular/core/testing';

import { Firebase.MessagingService } from './firebase.messaging.service';

describe('Firebase.MessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Firebase.MessagingService]
    });
  });

  it('should be created', inject([Firebase.MessagingService], (service: Firebase.MessagingService) => {
    expect(service).toBeTruthy();
  }));
});
