import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {UserAuthenticationService} from "../../services/user-authentication.service";

@Component({
  selector: 'app-single-page-layout',
  templateUrl: './single-page-layout.component.html',
  styleUrls: ['./single-page-layout.component.scss']
})
export class SinglePageLayoutComponent implements OnInit {
  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChild('header') header!: ElementRef;


  constructor(private _authenticationService: UserAuthenticationService) {
  }


  @HostListener('window:scroll') // for window scroll events
  onScroll(event: any) {
    const offset = window.scrollY;


    const navStyle = getComputedStyle(this.headerNav.nativeElement);
    const headerStyle = getComputedStyle(this.header.nativeElement);

    const navBottom = parseInt(navStyle.bottom);
    const navHeight = parseInt(navStyle.height);
    const headerHeight = parseInt(headerStyle.height);


    if (offset > headerHeight - navBottom - navHeight) {
      this.headerNav.nativeElement.classList.add('fixed');
    } else {
      this.headerNav.nativeElement.classList.remove('fixed');
    }
  }

  ngOnInit(): void {
  }

  isLogin(): boolean {
    return this._authenticationService.hasAccess();
  }

  logout($event: any) {
    this._authenticationService.clearToken();
  }
}
