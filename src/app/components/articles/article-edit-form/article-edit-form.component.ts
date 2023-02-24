import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {ArticleOptionsRestType} from "../../../api/models/article-options-rest-type";

@Component({
  selector: 'app-article-edit-form',
  templateUrl: './article-edit-form.component.html',
  styleUrls: ['./article-edit-form.component.scss']
})
export class ArticleEditFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() article: ArticleOptionsRestType = {
    title: 'New Title',
    teaser: 'Beispiel Teaser'
  }

  @Output() saveSubmit = new EventEmitter<ArticleOptionsRestType>();

  articleForm = new FormGroup({
    title: new FormControl(this.article.title),
    teaser: new FormControl(this.article.teaser, {nonNullable: true})
  })

  private subscriptions: Subscription[] = []

  constructor() {

  }


  ngOnInit(): void {
    // Todo: Vereinfachen?
    this.articleForm.setValue({
      title: this.article.title,
      teaser: this.article.teaser
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

  onSubmit($event: any) {
    const values = this.articleForm.value;
    if (this.articleForm.valid && values.title) {
      this.article.title = values.title;
      this.article.teaser = values.teaser;

      this.saveSubmit.emit(this.article);
    }
  }
}
