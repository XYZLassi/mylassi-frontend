import { TestBed } from '@angular/core/testing';

import { FullArticleService } from './full-article.service';

describe('ArticleCacheService', () => {
  let service: FullArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
