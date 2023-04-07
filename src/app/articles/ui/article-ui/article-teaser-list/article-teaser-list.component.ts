import {Component, Input} from '@angular/core';
import {IArticleTeaser} from "../../../data-access";

@Component({
  selector: 'app-article-teaser-list',
  templateUrl: './article-teaser-list.component.html',
  styleUrls: ['./article-teaser-list.component.scss']
})
export class ArticleTeaserListComponent {
  @Input() articles: IArticleTeaser[] = [];
}
