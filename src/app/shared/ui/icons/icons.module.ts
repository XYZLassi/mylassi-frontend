import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconTableColumnsComponent } from './icon-table-columns/icon-table-columns.component';
import { IconNewsPaperComponent } from './icon-news-paper/icon-news-paper.component';



@NgModule({
    declarations: [
        IconTableColumnsComponent,
        IconNewsPaperComponent
    ],
  exports: [
    IconTableColumnsComponent,
    IconNewsPaperComponent
  ],
    imports: [
        CommonModule
    ]
})
export class IconsModule { }
