import {Directive} from '@angular/core';
import {IArticleContent} from "../../data-access";

export interface ArticleContentContext {
  $implicit: IArticleContent;
}

@Directive({
  selector: 'ng-template[articleContent]',
  standalone: true,
})
export class ArticleContentDirective {
  static ngTemplateContextGuard(dir: ArticleContentDirective, ctx: unknown):
    ctx is ArticleContentContext {
    return true;
  }
}
