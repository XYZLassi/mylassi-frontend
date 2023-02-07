import {Component, OnInit} from '@angular/core';
import {ArticleListModel} from "../../components/articles/interfaces";
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryArticlesQuery} from "../../../generated/graphql";

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit {

  public category!: string

  public articles: ArticleListModel[] = [];

  constructor(private _apollo: Apollo, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    const query = graphql`
      query CategoryArticles($category:String!){
        categoryByUniqueName(category: $category ){
          category
          articles{
            id
            title
            teaser
            filesByUsage(usage: "thumbnail") {
              url
            }
          }
        }
      }`

    this.route.params.subscribe(params => {
      this.clear();
      let category = params['category'];

      if (!category)
        return

      let variables = {
        category: category
      }

      this._apollo.watchQuery<CategoryArticlesQuery>({query, variables}).valueChanges.subscribe(next => {
        if (!next.data.categoryByUniqueName) {
          this.router.navigate(['/error', '404']);
          return // Todo: 404
        }

        this.category = next.data.categoryByUniqueName.category;
        next.data.categoryByUniqueName.articles.forEach(article => {
          this.articles.push({
            id: parseInt(article.id),
            title: article.title,
            teaser: article.teaser,
            thumbnail: article.filesByUsage.length > 0 ? article.filesByUsage[0].url : null,
          });
        })
      });
    });
  }

  private clear() {
    this.category = "";
    this.articles = [];
  }
}
