import { TestBed } from '@angular/core/testing';

import { StackOverflowService } from './stack-overflow.service';

describe('StackOverflowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StackOverflowService = TestBed.get(StackOverflowService);
    expect(service).toBeTruthy();
  });
});
