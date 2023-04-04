import {Component, Input} from '@angular/core';
import {ArticleContentRestType} from "../../../api/models/article-content-rest-type";
import {IArticleContentModel} from "../../../interfaces";

@Component({
  selector: 'app-article-content-view',
  templateUrl: './article-content-view.component.html',
  styleUrls: ['./article-content-view.component.scss']
})
export class ArticleContentViewComponent {

  @Input() content?: IArticleContentModel | ArticleContentRestType;

}
