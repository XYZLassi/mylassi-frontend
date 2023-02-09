import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FilesService} from "../../../api/services/files.service";

@Component({
  selector: 'app-api-image-view',
  templateUrl: './api-image-view.component.html',
  styleUrls: ['./api-image-view.component.scss']
})
export class ApiImageViewComponent implements OnChanges, OnInit {

  public imageUrl: string | null | undefined;
  public altText: string | null | undefined;

  @Input() imageFileId: string | null | undefined;

  public resolutionList: number[] = []

  constructor(private fileService: FilesService) {
  }

  updateImage() {
    this.imageUrl = null;
    this.resolutionList = [];
    this.altText = null;

    const baseResolutions = [426, 640, 854, 1280, 1920, 2560, 3840, 7680];

    if (!this.imageFileId)
      return
    this.fileService.getFileInfoFilesFileInfoGet({
      file: this.imageFileId
    }).subscribe(next => {
      this.imageUrl = next.url;
      this.altText = next.filename;

      this.resolutionList = []
      baseResolutions.forEach(i => {
        if (next.image_width && i < next.image_width)
          this.resolutionList.push(i)
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  ngOnInit(): void {
    this.updateImage();
  }


}
