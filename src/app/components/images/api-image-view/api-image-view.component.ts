import {
  Component,
  Inject,
  Input,
  isDevMode,
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
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-api-image-view',
  templateUrl: './api-image-view.component.html',
  styleUrls: ['./api-image-view.component.scss']
})
export class ApiImageViewComponent implements OnInit, OnChanges, OnDestroy {

  public imageUrl: string | null | undefined;
  public altText: string | null | undefined;

  public resolutionList: number[] = []

  @Input() image?: File | string | null;

  @Input() hoverEffect: boolean = true;

  private imageOriginUrl: string | null | undefined;

  private subscriptions: Subscription[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private fileService: FilesService, private state: TransferState) {
  }

  ngOnInit(): void {
    const imageId = this.image as string;
    if (isPlatformBrowser(this.platformId) && imageId) {
      const stateKey = makeStateKey<FileRestType>(`image-${imageId}`);

      const result = this.state.get(stateKey, null);
      if (result) {
        this.updateImageFromRestFile(result);
      } else {
        this.updateImage();
      }
    } else {
      this.updateImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadImageFromApi(imageId: string) {
    let querySub = this.fileService.getFileInfo({
      file: imageId
    }).subscribe(next => {
      if (!isPlatformBrowser(this.platformId)) {
        const stateKey = makeStateKey<FileRestType>(`image-${imageId}`);
        this.state.set(stateKey, next);
      }

      this.updateImageFromRestFile(next);
    });
    this.subscriptions = [...this.subscriptions, querySub];
  }

  updateImageFromRestFile(restFile: FileRestType) {
    this.imageUrl = isDevMode() ? restFile.url : `/images/${restFile.id}`;
    this.imageOriginUrl = restFile.url;
    this.altText = restFile.filename;

    const baseResolutions = [426, 640, 854, 1280, 1920, 2560, 3840, 7680];

    this.resolutionList = []
    baseResolutions.forEach(i => {
      if (restFile.imageWidth && i < restFile.imageWidth)
        this.resolutionList.push(i)
    });
  }

  updateImage() {
    this.imageUrl = null;
    this.resolutionList = [];
    this.altText = null;
    this.imageOriginUrl = null;

    if (isPlatformBrowser(this.platformId) && this.image instanceof File) {
      this.resolutionList = [];
      this.altText = null;

      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageUrl = String(event.target?.result);
      }

      reader.readAsDataURL(this.image);
    } else if (this.image as string) {
      this.loadImageFromApi(this.image as string)
    }
  }


  onImageLoadError($event: ErrorEvent) {
    this.imageUrl = this.imageOriginUrl;
  }
}
