import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WipBannerViewComponent } from './wip-banner-view/wip-banner-view.component';



@NgModule({
  declarations: [
    WipBannerViewComponent
  ],
  exports: [
    WipBannerViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ViewsModule { }
