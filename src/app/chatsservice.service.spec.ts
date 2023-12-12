import { TestBed } from '@angular/core/testing';

import { ChatsserviceService } from './chatsservice.service';

describe('ChatsserviceService', () => {
  let service: ChatsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
