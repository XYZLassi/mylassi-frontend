import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArticleFileUsage} from "../../../api/models/article-file-usage";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ArticleFileUploadData} from "../../../services/file-upload.service";


@Component({
  selector: 'app-api-image-uploader',
  templateUrl: './api-image-uploader.component.html',
  styleUrls: ['./api-image-uploader.component.scss']
})
export class ApiImageUploaderComponent {
  @Input() images: ArticleFileUploadData[] = []
  @Output() imagesChange = new EventEmitter<ArticleFileUploadData[]>();

  @Input() defaultUsage: ArticleFileUsage | null = null;

  faTrash = faTrash;

  constructor() {
  }

  onChangeImage($event: any) {
    if (!$event.target.files)
      return;

    Array.from($event.target.files).forEach(file => {
      const image = file as File;
      if (image) {
        this.images.push({
          file: image,
          fileUsage: this.defaultUsage
        });
      }
    });

    $event.target.value = '';
  }


  removeImage(image: ArticleFileUploadData) {
    this.images = this.images.filter(item => item !== image);
  }
}
