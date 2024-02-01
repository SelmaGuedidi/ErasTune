import { TestBed } from '@angular/core/testing';

import { SpotifyapiService } from './spotifyapi.service';

describe('SpotifyapiService', () => {
  let service: SpotifyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
