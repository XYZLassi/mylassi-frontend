import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ArticleContentOptionsRestType} from "../../../../api/models/article-content-options-rest-type";
import {ArticleContentType} from "../../../../api/models/article-content-type";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-article-content-edit-form',
  templateUrl: './article-content-edit-form.component.html',
  styleUrls: ['./article-content-edit-form.component.scss']
})
export class ArticleContentEditFormComponent implements OnInit {

  @Input() articleContent: ArticleContentOptionsRestType = {
    contentType: ArticleContentType.Header,
  };

  @Output() saveSubmit = new EventEmitter<ArticleContentOptionsRestType>();

  contentForm = new FormGroup({
    header: new FormControl(this.articleContent.header),
  });

  ngOnInit(): void {
    this.contentForm.setValue({
      header: this.articleContent.header
    });
  }

  onSubmit($event: any) {
    if (!this.contentForm.valid)
      return;
    const values = this.contentForm.value;

    this.saveSubmit.emit({
      contentType: this.articleContent.contentType,
      header: values.header || undefined,
    });
  }


}
