import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-file-image-view',
  templateUrl: './file-image-view.component.html',
  styleUrls: ['./file-image-view.component.scss']
})
export class FileImageViewComponent implements OnInit, OnChanges {

  @Input() image!: File;

  private imageObject?: string;


  ngOnInit(): void {
    this.updateImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  updateImage() {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.imageObject = String(event.target?.result);
    }

    reader.readAsDataURL(this.image);
  }

}
