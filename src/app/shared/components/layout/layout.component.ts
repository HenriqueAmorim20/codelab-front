import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'cl-layout',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
