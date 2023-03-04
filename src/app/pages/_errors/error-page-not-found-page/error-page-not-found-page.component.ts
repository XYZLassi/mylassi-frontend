import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {REQUEST, RESPONSE} from "@nguniversal/express-engine/tokens";
import {isPlatformServer} from "@angular/common";
import {Request, Response} from 'express';

@Component({
  selector: 'app-error-page-not-found-page',
  templateUrl: './error-page-not-found-page.component.html',
  styleUrls: ['./error-page-not-found-page.component.scss']
})
export class ErrorPageNotFoundPageComponent implements OnInit {
  constructor(@Optional() @Inject(REQUEST) private request: Request,
              @Optional() @Inject(RESPONSE) private response: Response,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
  }
}
