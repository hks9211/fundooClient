import { TestBed } from '@angular/core/testing';

import { ListGridViewService } from './list-grid-view.service';

describe('ListGridViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListGridViewService = TestBed.get(ListGridViewService);
    expect(service).toBeTruthy();
  });
});
