import { CanActivateChildFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const user = loginService.currentUser;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const data = route.data as { modulo: number };

  if (user.admin) return true;

  const hasPermission = user.modulos.includes(data.modulo);

  if (!hasPermission) {
    router.navigate(['/acesso-negado']);
    return false;
  }

  return true;
};
