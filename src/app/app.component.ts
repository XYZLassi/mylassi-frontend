import {Component, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {concatWith, interval, of, Subscription, switchMap} from "rxjs";
import {UserAuthenticationService} from "./services/user-authentication/user-authentication.service";
import {filter} from "rxjs/operators";

const TOKEN_REFRESH_TIME = 5 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []

  constructor(private authenticationService: UserAuthenticationService) {
  }


  ngOnInit(): void {
    const tokenUpdateSub = of(-1).pipe(
      concatWith(interval(TOKEN_REFRESH_TIME)),
      filter(_ => this.authenticationService.hasAccess()),
      switchMap(_ => {
        return this.authenticationService.refreshToken()
      })
    ).subscribe(token => {
      if (isDevMode()) {
        console.log('Update:Token', token);
      }
    });

    this.subscriptions = [...this.subscriptions, tokenUpdateSub]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
