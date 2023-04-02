import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserAuthenticationService} from "../../../services/user-authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: UserAuthenticationService, private _router: Router) {
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSubmit($event: any) {
    const {username, password} = this.profileForm.value;

    if (!username || !password)
      return

    const loginSub = this.authenticationService.login(username, password)
      .subscribe(token => {
        this._router.navigate(['/admin']);
        loginSub.unsubscribe();
      });

    this.subscriptions = [...this.subscriptions, loginSub];
  }
}
