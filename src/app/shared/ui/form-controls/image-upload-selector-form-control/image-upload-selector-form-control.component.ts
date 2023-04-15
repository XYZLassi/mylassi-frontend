import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

interface FileInfo {
  isFile: boolean
  file?: File
  apiFileId?: string
}

@Component({
  selector: 'app-image-upload-selector-form-control',
  templateUrl: './image-upload-selector-form-control.component.html',
  styleUrls: ['./image-upload-selector-form-control.component.scss']
})
export class ImageUploadSelectorFormControlComponent implements OnInit {


  @Output() uploadImagesChanges = new EventEmitter<File[]>();
  @Output() apiImagesChanges = new EventEmitter<string[]>();


  @Input() baseApiImageFileIds: string[] = [];
  @Input() singleton = false;

  public images: FileInfo[] = []

  @ViewChild('inputElement') inputElementElementRef?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.images = this.baseApiImageFileIds.map(i => {
      return {
        isFile: false,
        apiFileId: i,
      }
    })
  }

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
    this.uploadImagesChanges.emit(uploadImages);

    const apiImages = this.images
      .filter(i => !i.isFile)
      .map(i => i.apiFileId) as string[];
    this.apiImagesChanges.emit(apiImages);
  }

  onUploadImage($event: Event) {
    this.inputElementElementRef?.nativeElement.click();
  }
}
