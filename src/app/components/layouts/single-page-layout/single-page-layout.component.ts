import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-single-page-layout',
  templateUrl: './single-page-layout.component.html',
  styleUrls: ['./single-page-layout.component.scss']
})
export class SinglePageLayoutComponent implements OnInit {
  @ViewChild('headerNav') headerNav!: ElementRef;
  @ViewChild('header') header!: ElementRef;

  @Input() centerContent: boolean = false;

  constructor() {
  }


  @HostListener('window:scroll') // for window scroll events
  onScroll(event: any) {
    const offset = window.pageYOffset;

    const navBox = this.headerNav.nativeElement.getBoundingClientRect();
    const headerBox = this.header.nativeElement.getBoundingClientRect();

    const navStyle = getComputedStyle(this.headerNav.nativeElement);
    const headerStyle = getComputedStyle(this.header.nativeElement);

    const navBottom = parseInt(navStyle.bottom);
    const navHeight = parseInt(navStyle.height);
    const headerHeight = parseInt(headerStyle.height);


    console.log(offset, headerHeight - navBottom - navHeight)
    if (offset > headerHeight - navBottom - navHeight) {
      this.headerNav.nativeElement.classList.add('fixed');
    } else {
      this.headerNav.nativeElement.classList.remove('fixed');
    }
  }

  ngOnInit(): void {
  }

}
