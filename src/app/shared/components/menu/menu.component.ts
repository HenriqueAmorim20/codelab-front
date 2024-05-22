import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'cl-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(private readonly _router: Router) {}

  menuItems: IMenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      path: '/',
    },
    {
      label: 'Usuário',
      icon: 'person',
      path: '/usuario',
    },
  ];

  handleNavigation(path: string): void {
    this._router.navigateByUrl(path);
  }
}
