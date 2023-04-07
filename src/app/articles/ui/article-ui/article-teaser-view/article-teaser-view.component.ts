import {Component, Input} from '@angular/core';
import {IArticleTeaser} from "../../../data-access";

@Component({
  selector: 'app-article-teaser-view',
  templateUrl: './article-teaser-view.component.html',
  styleUrls: ['./article-teaser-view.component.scss']
})
export class ArticleTeaserViewComponent {
  @Input() article!: IArticleTeaser

  public get hasThumbnails() {
    return this.article.thumbnails.length > 0;
  }

  public get thumbnailImageId() {
    if (!this.hasThumbnails)
      return undefined;

    return this.article.thumbnails[0];
  }
}
