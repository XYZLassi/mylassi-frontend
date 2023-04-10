import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ThisReceiver} from "@angular/compiler";

@Component({
  selector: 'app-file-image-view',
  templateUrl: './file-image-view.component.html',
  styleUrls: ['./file-image-view.component.scss']
})
export class FileImageViewComponent implements OnChanges {
  @Input() imageFile?: File;

  public imageSrc?: string;

  public loadError = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.imageSrc = undefined;
    this.loadError = false;
    if (!this.imageFile)
      return;


    let reader = new FileReader();
    reader.onload = (event) => {
      this.imageSrc = String(event.target?.result);
    }
    reader.onerror = (err) => {
      this.loadError = true;
    }

    reader.readAsDataURL(this.imageFile);
  }


}
