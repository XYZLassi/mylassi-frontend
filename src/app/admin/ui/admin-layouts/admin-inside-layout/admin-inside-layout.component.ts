import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-admin-inside-layout',
  templateUrl: './admin-inside-layout.component.html',
  styleUrls: ['./admin-inside-layout.component.scss']
})
export class AdminInsideLayoutComponent {
  @Input() header?: string;
}
