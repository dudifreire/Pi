import { TestBed } from '@angular/core/testing';

import { RoutingGuardsGuard } from './routing-guards.guard';

describe('RoutingGuardsGuard', () => {
  let guard: RoutingGuardsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoutingGuardsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
