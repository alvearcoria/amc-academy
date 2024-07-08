import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthRedirectGuard } from './auth-redirect.guard';

describe('AuthRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => AuthRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
