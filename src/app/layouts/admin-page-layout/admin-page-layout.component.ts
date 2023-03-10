import {Component} from '@angular/core';
import {faTableColumns, faFileLines} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-admin-page-layout',
  templateUrl: './admin-page-layout.component.html',
  styleUrls: ['./admin-page-layout.component.scss']
})
export class AdminPageLayoutComponent {
  faTableColumns = faTableColumns;
  faFileLines = faFileLines;
}
