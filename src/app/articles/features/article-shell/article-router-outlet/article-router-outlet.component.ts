import {Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {ChildrenOutletContexts} from "@angular/router";

@Component({
  selector: 'app-article-router-outlet',
  templateUrl: './article-router-outlet.component.html',
  styleUrls: ['./article-router-outlet.component.scss']
})
export class ArticleRouterOutletComponent {
  private contexts = inject(ChildrenOutletContexts);

  @ViewChild('headerNav') headerNav!: ElementRef;


  @HostListener('window:scroll') // for window scroll events
  onScroll(event: any) {
    const header = document.querySelector('#header');

    if (!header)
      return

    const offset = window.scrollY;

    const navStyle = getComputedStyle(this.headerNav.nativeElement);
    const headerStyle = getComputedStyle(header);

    const navBottom = parseInt(navStyle.bottom);
    const navHeight = parseInt(navStyle.height);
    const headerHeight = parseInt(headerStyle.height);


    if (offset > headerHeight - navBottom - navHeight) {
      this.headerNav.nativeElement.classList.add('fixed');
    } else {
      this.headerNav.nativeElement.classList.remove('fixed');
    }
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }
}
