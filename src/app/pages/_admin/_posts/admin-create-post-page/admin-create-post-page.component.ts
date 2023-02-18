import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ArticlesService} from "../../../../api/services/articles.service";

@Component({
  selector: 'app-admin-create-post-page',
  templateUrl: './admin-create-post-page.component.html',
  styleUrls: ['./admin-create-post-page.component.scss']
})
export class AdminCreatePostPageComponent {

  postForm = new FormGroup({
    title: new FormControl('Post Title'),
    teaser: new FormControl('Teaser')
  })

  constructor(private articleService: ArticlesService) {
  }

  onSubmit($event: any) {
    const values = this.postForm.value;

    if (!values.title)
      return

    this.articleService.createNewArticleArticlesPost({
      body: {
        options: {
          title: values.title,
          teaser: values.teaser || undefined,
        }
      }
    }).subscribe(value => {
      this.postForm.reset();
    })
  }
}
