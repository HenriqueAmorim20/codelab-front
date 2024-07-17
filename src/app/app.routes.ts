import { Routes } from '@angular/router';
import { pagesRoutes } from './pages/pages.routing';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: pagesRoutes,
    canActivateChild: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'acesso-negado',
    component: AccessDeniedComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
