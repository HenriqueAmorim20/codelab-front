import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

@Component({
  selector: 'cl-root',
  standalone: true,
  imports: [LayoutComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
