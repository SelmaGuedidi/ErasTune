import { TestBed } from '@angular/core/testing';

import { DidyouknowService } from './didyouknow.service';

describe('DidyouknowService', () => {
  let service: DidyouknowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DidyouknowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
