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

  public loadError: boolean = false;

  public imageUrl?: string;
  public altText?: string;

  public resolutionList: number[] = []

  @Input() image?: File | string;

  @Input() hoverEffect: boolean = true;


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
        this.updateImageFromFileObject();
      }
    } else {
      this.updateImageFromFileObject();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImageFromFileObject();
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
    this.imageUrl = `/images/${restFile.id}`
    this.altText = restFile.filename;

    const baseResolutions = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];

    const width = restFile.imageWidth || 0;
    this.resolutionList = baseResolutions.filter(i => i <= width);
  }

  updateImageFromFileObject() {
    this.resolutionList = [];

    if (isPlatformBrowser(this.platformId) && this.image instanceof File) {
      this.resolutionList = [];

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
    this.loadError = true;
  }
}
