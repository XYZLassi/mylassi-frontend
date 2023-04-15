import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Apollo, graphql} from "apollo-angular";
import {Subscription} from "rxjs";
import {LoadArticleThumbnailInfoGQL} from "../../../../../graphQL/graphql";

const loadThumbnailInfo = graphql`
  query LoadArticleThumbnailInfo($articleId:Int!){
    article: articleById(article: $articleId){
      thumbnails: filesByUsage(usage: "thumbnail"){
        fileId
      }
    }
  }
`

@Component({
  selector: 'app-api-article-thumbnail-loader-view',
  templateUrl: './api-article-thumbnail-loader-view.component.html',
  styleUrls: ['./api-article-thumbnail-loader-view.component.scss']
})
export class ApiArticleThumbnailLoaderViewComponent implements OnChanges, OnDestroy {
  private apollo = inject(Apollo);


  @Input() articleId?: number;

  public fileId?: string;

  private loadSub?: Subscription;
  private subscriptions: Subscription[] = [];

  public isBusy = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.fileId = undefined;
    this.isBusy = false;

    if (this.loadSub)
      this.loadSub.unsubscribe()

    if (!this.articleId)
      return;

    this.isBusy = true;

    const query = new LoadArticleThumbnailInfoGQL(this.apollo);
    this.loadSub = query.fetch({
      articleId: this.articleId,
    }).subscribe({
        next: result => {
          this.isBusy = false;
          if (result.data.article && result.data.article.thumbnails.length > 0)
            this.fileId = result.data.article.thumbnails[0].fileId;
        },
        error: err => {

        },
        complete: () => {
        }
      }
    )

    this.subscriptions = [...this.subscriptions, this.loadSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }


}
