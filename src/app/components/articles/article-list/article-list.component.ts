import {Component, Input} from '@angular/core';
import {Interfaces} from "../interfaces";


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  @Input() articles: Interfaces[] = [];
}
