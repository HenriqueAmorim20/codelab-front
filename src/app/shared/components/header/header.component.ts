import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'cl-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private readonly _loginService: LoginService) {}

  logout(): void {
    this._loginService.logout();
  }
}
