import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'cl-root',
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
