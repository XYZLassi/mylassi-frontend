import {Component, Input} from '@angular/core';
import {IArticleContent} from "../../../data-access";
import {IApiArticleContentType} from "../../../../../api";


@Component({
  selector: 'app-article-content-view',
  templateUrl: './article-content-view.component.html',
  styleUrls: ['./article-content-view.component.scss']
})
export class ArticleContentViewComponent {
  @Input() content!: IArticleContent

  public get isHeader() {
    return this.testType(IApiArticleContentType.Header);
  }

  public get isText() {
    return this.testType(IApiArticleContentType.Text);
  }

  private testType(contentType: IApiArticleContentType) {
    return this.content.contentType === contentType
  }

}
