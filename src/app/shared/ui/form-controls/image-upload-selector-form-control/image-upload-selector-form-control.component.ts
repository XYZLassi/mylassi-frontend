import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

interface FileInfo {
  isFile: boolean
  file?: File
}

@Component({
  selector: 'app-image-upload-selector-form-control',
  templateUrl: './image-upload-selector-form-control.component.html',
  styleUrls: ['./image-upload-selector-form-control.component.scss']
})
export class ImageUploadSelectorFormControlComponent {

  @Output() uploadFiles = new EventEmitter<File[]>();

  @Input() singleton = false;

  public images: FileInfo[] = []

  @ViewChild('inputElement') inputElementElementRef?: ElementRef<HTMLInputElement>;

  onChangeImage($event: any) {
    if (!$event.target?.files)
      return;

    Array.from($event.target.files).forEach(file => {
      const image = file as File;
      if (image) {
        this.addImages(image);
      }
    });

    $event.target.value = '';
  }

  private addImages(...images: File[]) {
    images.forEach(image => {
      this.images.push({
        isFile: true,
        file: image
      });
    });

    if (this.singleton && this.images.length > 1) {
      const lastImage = this.images[this.images.length - 1];
      this.images = [lastImage];
    }

    const uploadImages = this.images
      .filter(i => i.isFile)
      .map(i => i.file) as File[];
    this.uploadFiles.emit(uploadImages);
  }

  onUploadImage($event: Event) {
    this.inputElementElementRef?.nativeElement.click();
  }
}
