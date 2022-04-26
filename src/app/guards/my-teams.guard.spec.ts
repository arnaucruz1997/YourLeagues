import { TestBed } from '@angular/core/testing';

import { MyTeamsGuard } from './my-teams.guard';

describe('MyTeamsGuard', () => {
  let guard: MyTeamsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyTeamsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
