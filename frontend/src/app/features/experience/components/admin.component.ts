import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  readonly title = 'Admin';
  readonly highlights = ['Premium UX', 'Color-rich design', 'Connected flow'];
}
