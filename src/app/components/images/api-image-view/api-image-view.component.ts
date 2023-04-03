import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {FilesService} from "../../../api/services/files.service";
import {Subscription} from "rxjs";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {FileRestType} from "../../../api/models/file-rest-type";
import {IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-api-image-view',
  templateUrl: './api-image-view.component.html',
  styleUrls: ['./api-image-view.component.scss'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.width)
          return `/images/${config.src}?width=${config.width}`;
        return `/images/${config.src}`;
      },
    },
  ],
})
export class ApiImageViewComponent implements OnInit, OnChanges, OnDestroy {

  public loadError: boolean = false;

  public imageId?: string;
  public altText?: string;
  public imageWidth?: number;
  public imageHeight?: number;

  @Input() image?: string | FileRestType;


  private subscriptions: Subscription[] = [];


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private fileService: FilesService, private state: TransferState) {
  }

  ngOnInit(): void {
    this.updateImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateImage() {
    if (!this.image) {
      this.loadError = true;
      return;
    }
    this.loadError = false;


    if (typeof this.image !== "string") {
      this.setImage(this.image as FileRestType);
      return;
    }

    const imageId = this.image as string;
    if (isPlatformBrowser(this.platformId) && imageId) {
      const result = this.state.get(this.stateKey(imageId), undefined);
      if (result) {
        this.setImage(result);
        return;
      }
    }

    this.loadImageFromApi(imageId);

  }

  loadImageFromApi(imageId: string) {
    let querySub = this.fileService.getFileInfo({
      file: imageId
    }).subscribe({
      next: fileInfo => {
        if (!isPlatformBrowser(this.platformId)) {
          const stateKey = makeStateKey<FileRestType>(`image-${imageId}`);
          this.state.set(stateKey, fileInfo);
        }

        this.setImage(fileInfo);
        querySub.unsubscribe();
      },
      error: err => {
        this.loadError = false;
        querySub.unsubscribe();
      }
    });
    this.subscriptions = [...this.subscriptions, querySub];
  }

  setImage(restFile: FileRestType) {
    this.imageId = restFile.id;
    this.altText = restFile.filename;

    this.imageWidth = restFile.imageWidth;
    this.imageHeight = restFile.imageHeight;
  }

  public getSrcSet() {
    const breakPoints = [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920];

    const width = this.imageWidth || 0;
    return breakPoints.filter(i => i <= width).map(i => `${i}w`).join(', ');
  }

  onImageLoadError($event: ErrorEvent) {
    this.loadError = true;
  }

  private stateKey(imageId: string) {
    return makeStateKey<FileRestType>(`image-${imageId}`);
  }
}
