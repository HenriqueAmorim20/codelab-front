import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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
  menuItems: IMenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      path: '/',
    },
  ];

  handleNavigation(path: string): void {
    console.log(path);
  }
}
