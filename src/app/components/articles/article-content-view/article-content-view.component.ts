import {Component, Input} from '@angular/core';
import {ArticleContentModel} from "../_interfaces/article-content-model";
import {ArticleContentRestType} from "../../../api/models/article-content-rest-type";

@Component({
  selector: 'app-article-content-view',
  templateUrl: './article-content-view.component.html',
  styleUrls: ['./article-content-view.component.scss']
})
export class ArticleContentViewComponent {

  @Input() content?: ArticleContentModel | ArticleContentRestType;

}
