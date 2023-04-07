import {Component, Input} from '@angular/core';
import {IArticleContent} from "../../../data-access";

@Component({
  selector: 'app-article-header-content-view',
  templateUrl: './article-header-content-view.component.html',
  styleUrls: ['./article-header-content-view.component.scss']
})
export class ArticleHeaderContentViewComponent {
  @Input() content!: IArticleContent;
}
