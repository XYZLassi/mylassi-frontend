import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArticleContentOptionsRestType} from "../../../../api/models/article-content-options-rest-type";
import {ArticleContentType} from "../../../../api/models/article-content-type";

@Component({
  selector: 'app-article-content-edit-form',
  templateUrl: './article-content-edit-form.component.html',
  styleUrls: ['./article-content-edit-form.component.scss']
})
export class ArticleContentEditFormComponent {

  @Input() articleContent?: ArticleContentOptionsRestType = {
    contentType: ArticleContentType.Header,
  };

  @Output() saveSubmit = new EventEmitter<ArticleContentOptionsRestType>();

  onSubmit($event: any) {
    this.saveSubmit.emit(this.articleContent);
  }
}
