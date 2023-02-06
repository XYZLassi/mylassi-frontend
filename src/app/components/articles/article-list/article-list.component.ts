import {Component, Input} from '@angular/core';
import {ArticleListModel} from "../interfaces/article-list-model";


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  @Input() articles: ArticleListModel[] = [];
}
