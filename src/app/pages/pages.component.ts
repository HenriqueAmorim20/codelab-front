import { LayoutComponent } from './../shared/components/layout/layout.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './pages.component.html',
})
export class PagesComponent {}
