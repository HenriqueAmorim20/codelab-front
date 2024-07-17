import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { usuarioRoutes } from './usuario/usuario.routing';
import { EMenuPermissao } from '../shared/enums/menu-permissao.enum';

export const pagesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      modulo: EMenuPermissao.Home,
    },
  },
  ...usuarioRoutes,
];
