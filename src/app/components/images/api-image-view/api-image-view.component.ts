import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FilesService} from "../../../api/services/files.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-api-image-view',
  templateUrl: './api-image-view.component.html',
  styleUrls: ['./api-image-view.component.scss']
})
export class ApiImageViewComponent implements OnChanges, OnDestroy {

  public imageUrl: string | null | undefined;
  public altText: string | null | undefined;

  public resolutionList: number[] = []

  @Input() image?: File | string | null;

  @Input() hoverEffect: boolean = true;


  private subscriptions: Subscription[] = [];

  constructor(private fileService: FilesService) {
  }

  updateImage() {
    this.imageUrl = null;
    this.resolutionList = [];
    this.altText = null;

    const baseResolutions = [426, 640, 854, 1280, 1920, 2560, 3840, 7680];

    if (!this.image) {
      this.imageUrl = null;
      this.altText = null;
    } else if (this.image instanceof File) {
      this.resolutionList = [];
      this.altText = null;


      let reader = new FileReader();
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = String(event.target?.result);
      }

      reader.readAsDataURL(this.image); // read file as data url
    } else {
      let querySub = this.fileService.getFileInfo({
        file: String(this.image)
      }).subscribe(next => {
        this.imageUrl = next.url;
        this.altText = next.filename;

        this.resolutionList = []
        baseResolutions.forEach(i => {
          if (next.image_width && i < next.image_width)
            this.resolutionList.push(i)
        });
      });
      this.subscriptions = [...this.subscriptions, querySub];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
