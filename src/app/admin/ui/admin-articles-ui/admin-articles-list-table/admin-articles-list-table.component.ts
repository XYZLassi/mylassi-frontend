import {Component, Input} from '@angular/core';
import {IApiFullArticleRestType} from "../../../../../api";

@Component({
  selector: 'app-admin-articles-list-table',
  templateUrl: './admin-articles-list-table.component.html',
  styleUrls: ['./admin-articles-list-table.component.scss']
})
export class AdminArticlesListTableComponent {
  @Input() articles: IApiFullArticleRestType[] = [];
}
