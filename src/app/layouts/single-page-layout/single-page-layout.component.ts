import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserAuthenticationService} from "../../services/user-authentication.service";
import {ChildrenOutletContexts} from "@angular/router";
import {slideInAnimation} from "../../pages/frontend-pages/_animations";

@Component({
  selector: 'app-single-page-layout',
  templateUrl: './single-page-layout.component.html',
  styleUrls: ['./single-page-layout.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class SinglePageLayoutComponent implements OnInit {
  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChild('header') header!: ElementRef;

  private firstAnimation = true;

  constructor(private authenticationService: UserAuthenticationService,
              private contexts: ChildrenOutletContexts) {
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
    return this.authenticationService.hasAccess();
  }

  logout($event: any) {
    this.authenticationService.clearToken();
  }

  getRouteAnimationData() {


    const base = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    const index = this.contexts.getContext('primary')?.route?.snapshot?.params?.['index'];

    if (base != null && index == null)
      return base;
    else if (base != null && index != null)
      return `${base}-${index}`

    return undefined;
  }
}
