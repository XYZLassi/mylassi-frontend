import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SecurityService} from "../../../api/services/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private securityServer: SecurityService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit($event: any) {

    const {username, password} = this.profileForm.value;

    if (!username || !password)
      return

    this.securityServer.createNewToken({
      body: {
        username: username,
        password: password,
      }
    }).subscribe(next => {
      localStorage.setItem('token', JSON.stringify(next));
      this._router.navigate(['/']);
    })
  }
}
