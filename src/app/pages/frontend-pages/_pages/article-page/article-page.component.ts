import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Apollo, graphql} from "apollo-angular";
import {LoadArticleQuery} from "../../../../../generated/graphql";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo,
              private route: ActivatedRoute,
              private router: Router, private title: Title,
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
        }
      }`

    let routeSub = this.route.params.subscribe(params => {
      const articleId = parseInt(params['index']);

      const variables = {
        articleId: articleId
      };

      let querySub = this.apollo.watchQuery<LoadArticleQuery>({query, variables}).valueChanges.subscribe(value => {
        if (!value.data.article)
          return

        this.title.setTitle(`MyLassi.xyz - ${value.data.article.title}`);

        this.meta.updateTag({
          property: 'og:title',
          content: value.data.article.title
        });

        if (value.data.article.teaser) {
          this.meta.updateTag({
            property: 'og:description',
            content: value.data.article.teaser,
          })
        }

        this.meta.updateTag({
          property: 'og:url',
          content: `https://mylassi.xyz${this.router.url}`,
        });

        if (value.data.article.thumbnails.length > 0) {
          const url = value.data.article.thumbnails[0].url;
          this.meta.updateTag({
            property: 'og:image',
            content: url
          });
        }
      });

      this.subscriptions = [...this.subscriptions, querySub];
    });

    this.subscriptions = [...this.subscriptions, routeSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
