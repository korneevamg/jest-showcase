import { TestBed } from '@angular/core/testing';

import { JestShowcaseLibService } from './jest-showcase-lib.service';

describe('JestShowcaseLibService', () => {
  let service: JestShowcaseLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JestShowcaseLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
