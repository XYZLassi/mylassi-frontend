import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent<TData> {

  protected readonly faTrash = faTrash;

  @Input() allowDelete = false;
  @Input() imageData?: TData;

  @Output() removeImage = new EventEmitter<TData>();

  onRemoveImage($event: MouseEvent) {
    if (this.allowDelete && this.imageData) {
      this.removeImage.emit(this.imageData);
    }
  }
}
