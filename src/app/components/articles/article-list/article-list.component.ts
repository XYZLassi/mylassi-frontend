import {Component, Input} from '@angular/core';
import {ArticleInfoModel} from "../../../models";


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  @Input() articles: ArticleInfoModel[] = [];

  articleById(index: any, article: ArticleInfoModel) {
    return article.id;
  }
}
