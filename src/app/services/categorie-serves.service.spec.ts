import { TestBed } from '@angular/core/testing';

import { CategorieServesService } from './categorie-serves.service';

describe('CategorieServesService', () => {
  let service: CategorieServesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieServesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
