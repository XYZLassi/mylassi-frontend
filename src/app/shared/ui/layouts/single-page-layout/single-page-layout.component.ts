import {Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {ChildrenOutletContexts} from "@angular/router";

@Component({
  selector: 'app-single-page-layout',
  templateUrl: './single-page-layout.component.html',
  styleUrls: ['./single-page-layout.component.scss'],
  animations: [],
})
export class SinglePageLayoutComponent implements OnInit {
  private contexts = inject(ChildrenOutletContexts);

  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChild('header') header!: ElementRef;


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


  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }
}
