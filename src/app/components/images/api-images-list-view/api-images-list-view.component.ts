import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-api-images-list-view',
  templateUrl: './api-images-list-view.component.html',
  styleUrls: ['./api-images-list-view.component.scss']
})
export class ApiImagesListViewComponent<TData extends { fileId: string }> {
  @Input() images: TData[] = [];

  @Input() allowDelete = false;

  @Output() removedImage = new EventEmitter<TData>();

  onRemoveImage(image: TData) {
    this.removedImage.emit(image);
  }
}
