import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-api-file-image-selector-view',
  templateUrl: './api-file-image-selector-view.component.html',
  styleUrls: ['./api-file-image-selector-view.component.scss']
})
export class ApiFileImageSelectorViewComponent {
  @Input() image?: File | string;

  public fileObject() {
    return this.image as File;
  }

  public imageId() {
    return (this.image && !(this.image instanceof File)) ? this.image : undefined;
  }

  public isFile() {
    return this.image instanceof File;
  }
}
