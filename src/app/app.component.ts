import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

const TOKEN_REFRESH_TIME = 5 * 60 * 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []


  ngOnInit(): void {
    this.subscriptions = [...this.subscriptions]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
