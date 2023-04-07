import {Component, Input} from '@angular/core';
import {IArticleContent} from "../../../data-access";

@Component({
  selector: 'app-article-contents-list',
  templateUrl: './article-contents-list.component.html',
  styleUrls: ['./article-contents-list.component.scss']
})
export class ArticleContentsListComponent {
  @Input() contents: IArticleContent[] = [];
}
