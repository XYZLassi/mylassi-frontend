import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Apollo, graphql} from "apollo-angular";
import {LoadArticleQuery} from "../../../../../generated/graphql";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

interface ArticleContentType {
  position: number
  contentType: string
  header: string | null | undefined

}

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  public isBusy: boolean = true;

  public title?: string;
  public contents: ArticleContentType[] = []

  private subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo,
              private route: ActivatedRoute,
              private router: Router, private titleMeta: Title,
              private meta: Meta) {
  }

  ngOnInit(): void {
    const query = graphql`
      query LoadArticle($articleId : Int!){
        article:articleById(article: $articleId){
          title
          teaser
          thumbnails:filesByUsage(usage: "thumbnail") {
            url
          }

          author {
            username
          }

          contents {
            position
            contentType
            header
          }
        }
      }`

    let routeSub = this.route.params.subscribe(params => {
      this.isBusy = true;
      const articleId = parseInt(params['index']);

      // Test NaN

      const variables = {
        articleId: articleId
      };

      let querySub = this.apollo.watchQuery<LoadArticleQuery>({query, variables}).valueChanges
        .pipe(map(i => i.data))
        .subscribe(value => {
          if (!value.article)
            return;
          this.updateMeta(value);

          this.title = value.article.title;
          this.contents = value.article.contents;

          this.isBusy = false;
        });

      this.subscriptions = [...this.subscriptions, querySub];
    });

    this.subscriptions = [...this.subscriptions, routeSub];
  }

  updateMeta(query: LoadArticleQuery) {
    if (!query.article)
      return
    this.titleMeta.setTitle(`MyLassi.xyz - ${query.article.title}`);

    this.meta.updateTag({
      property: 'og:title',
      content: query.article.title
    });

    if (query.article.teaser) {
      this.meta.updateTag({
        property: 'og:description',
        content: query.article.teaser,
      })
    }

    this.meta.updateTag({
      property: 'og:url',
      content: `https://mylassi.xyz${this.router.url}`,
    });

    if (query.article.thumbnails.length > 0) {
      const url = query.article.thumbnails[0].url;
      this.meta.updateTag({
        property: 'og:image',
        content: url
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
