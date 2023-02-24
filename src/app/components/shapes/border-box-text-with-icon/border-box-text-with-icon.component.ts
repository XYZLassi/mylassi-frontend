import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-border-box-text-with-icon',
  templateUrl: './border-box-text-with-icon.component.html',
  styleUrls: ['./border-box-text-with-icon.component.scss']
})
export class BorderBoxTextWithIconComponent {

  @Input() text?: string

}
