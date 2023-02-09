import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Apollo, graphql} from "apollo-angular";
import {LoadArticleQuery} from "../../../generated/graphql";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  constructor(private apollo: Apollo,
              private route: ActivatedRoute, private router: Router, private meta: Meta) {
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

    this.route.params.subscribe(params => {
      const articleId = parseInt(params['articleId']);

      const variables = {
        articleId: articleId
      };

      this.apollo.watchQuery<LoadArticleQuery>({query, variables}).valueChanges.subscribe(value => {
        if (!value.data.article)
          return

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
    });
  }

}
