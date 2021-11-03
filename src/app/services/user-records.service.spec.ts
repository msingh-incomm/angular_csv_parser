import { TestBed } from '@angular/core/testing';

import { UserRecordsService } from './user-records.service';

describe('UserRecordsService', () => {
  let service: UserRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
