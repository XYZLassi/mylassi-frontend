import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FilesService} from "../../../api/services/files.service";

export interface ApiImageUploaderEvent {
  imageFile: File | null;
}

@Component({
  selector: 'app-api-image-uploader',
  templateUrl: './api-image-uploader.component.html',
  styleUrls: ['./api-image-uploader.component.scss']
})
export class ApiImageUploaderComponent implements OnDestroy {

  public imageFile: File | null = null;
  public imageUrl?: string;

  private subscriptions: Subscription[] = [];

  @Output() imageChanged: EventEmitter<ApiImageUploaderEvent> = new EventEmitter<ApiImageUploaderEvent>();

  constructor(private filesService: FilesService) {
  }

  onChangeImage($event: any) {
    this.imageFile = $event.target.files[0];

    if (!this.imageFile)
      return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.onloadend = () => {
      this.imageChanged.emit({
        imageFile: this.imageFile,
      })
    }
    reader.readAsDataURL(this.imageFile);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
