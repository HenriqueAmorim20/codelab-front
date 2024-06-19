import { Routes } from '@angular/router';
import { UsuarioConsultaComponent } from './usuario-consulta/usuario-consulta.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { pendingChangesGuard } from '../../shared/guards/pending-changes.guard';

export const usuarioRoutes: Routes = [
  {
    path: 'usuario',
    children: [
      {
        path: 'consulta',
        component: UsuarioConsultaComponent,
      },
      {
        path: 'cadastro',
        component: UsuarioCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: 'editar/:id',
        component: UsuarioCadastroComponent,
        canDeactivate: [pendingChangesGuard],
      },
      {
        path: '**',
        redirectTo: 'consulta',
        pathMatch: 'full',
      },
    ],
  },
];
