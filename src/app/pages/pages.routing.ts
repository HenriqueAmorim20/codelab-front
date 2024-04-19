import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { usuarioRoutes } from './usuario/usuario.routing';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  ...usuarioRoutes,
];
