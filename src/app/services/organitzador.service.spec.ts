import { TestBed } from '@angular/core/testing';

import { OrganitzadorService } from './organitzador.service';

describe('OrganitzadorService', () => {
  let service: OrganitzadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganitzadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
