import { Component, Input } from '@angular/core';
import { ActionBarComponent } from '../action-bar/action-bar.component';

@Component({
  selector: 'cl-page-layout',
  standalone: true,
  imports: [ActionBarComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
})
export class PageLayoutComponent {
  @Input({ required: true }) title!: string;
}
