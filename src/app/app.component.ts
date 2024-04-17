import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'cl-root',
  standalone: true,
  imports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
