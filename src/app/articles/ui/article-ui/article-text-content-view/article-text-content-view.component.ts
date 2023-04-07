import {Component, Input} from '@angular/core';
import {IArticleContent} from "../../../data-access";

@Component({
  selector: 'app-article-text-content-view',
  templateUrl: './article-text-content-view.component.html',
  styleUrls: ['./article-text-content-view.component.scss']
})
export class ArticleTextContentViewComponent {
  @Input() content!: IArticleContent;
}
