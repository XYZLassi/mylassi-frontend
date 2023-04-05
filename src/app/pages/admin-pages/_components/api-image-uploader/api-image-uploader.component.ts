import {Component, ElementRef, EventEmitter, isDevMode, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FileRestType} from "../../../../api/models/file-rest-type";
import {fromEvent, mergeMap, of, Subscription, take} from "rxjs";
import {map} from "rxjs/operators";
import {isNotNullOrUndefined} from "../../../../rx";
import {FilesService} from "../../../../api/services/files.service";


@Component({
  selector: 'app-api-image-uploader',
  templateUrl: './api-image-uploader.component.html',
  styleUrls: ['./api-image-uploader.component.scss']
})
export class ApiImageUploaderComponent implements OnDestroy, OnInit {
  @Output() uploadedImage = new EventEmitter<FileRestType>();

  @ViewChild('inputElement', {static: true}) inputElementElementRef!: ElementRef<HTMLInputElement>;


  private subscriptions: Subscription[] = [];

  constructor(private filesService: FilesService) {
  }

  ngOnInit(): void {
    const uploadSub = fromEvent(this.inputElementElementRef.nativeElement, 'change').pipe(
      map(event => {
        const element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;
        if (fileList) {
          return fileList
        }
        return null;
      }),
      isNotNullOrUndefined(),
      mergeMap(fileList => {
        const files = Array.from(fileList);
        return of(...files);
      }),
      mergeMap(file => {
        return this.filesService.uploadFile({
          body: {
            file: file
          }
        }).pipe(
          take(1)
        );
      })
    ).subscribe(file => {
        if (isDevMode())
          console.log("File Uploaded:", file)

        this.uploadedImage.emit(file);
      }
    );
    this.subscriptions = [...this.subscriptions, uploadSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  openUpload($event: any) {
    this.inputElementElementRef?.nativeElement.click();
  }


}
