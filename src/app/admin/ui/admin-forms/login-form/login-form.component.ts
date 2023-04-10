import {Component, EventEmitter, inject, isDevMode, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription, take} from "rxjs";
import {ApiSecurityService, IApiTokenRestType} from "../../../../../api";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private securityService = inject(ApiSecurityService);

  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  public isBusy = false;
  public errorMessage?: string;

  @Output() login = new EventEmitter<IApiTokenRestType>();

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const onChangeSub = this.loginForm.valueChanges.subscribe(
      () => {
        this.errorMessage = undefined;
      }
    );
    this.subscriptions = [...this.subscriptions, onChangeSub]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(i => i.unsubscribe());
  }

  onSubmit($event: any) {
    const {username, password} = this.loginForm.value;

    this.isBusy = false;
    this.errorMessage = undefined;

    if (!username || !password) {
      this.errorMessage = "Benutzername oder Passwort nicht angeben"
      return;
    }

    this.isBusy = true;

    const loginSub = this.securityService.createNewToken(
      {
        body: {username, password}
      }
    ).pipe(
      take(1)
    ).subscribe({
      next: result => {
        this.login.next(result);
      },
      complete: () => {
        this.isBusy = false;
      },
      error: (err: HttpErrorResponse) => {
        if (isDevMode()) {
          console.error(err);
        }
        this.isBusy = false;

        if (err.status == 401)
          this.errorMessage = "Benutzername oder Passwort ist falsch";
        else
          this.errorMessage = err.error.detail;

      }
    });

    this.subscriptions = [...this.subscriptions, loginSub];
  }
}
