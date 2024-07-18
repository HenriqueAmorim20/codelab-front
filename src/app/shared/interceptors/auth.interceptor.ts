import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackbarData } from '../interfaces/snackbar-data.interface';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { ESnackbarType } from '../enums/snackbar-type.enum';

const KONG_MESSAGES = [
  `No credentials found for given 'iss'`,
  `Invalid Signature`,
  `Invalid signature`,
  `token expired`,
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const loginService = inject(LoginService);

  const jwt = loginService.getJWT();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      return checkError(loginService, snackBar, error);
    }),
  );
};

function checkError(
  loginService: LoginService,
  snackbar: MatSnackBar,
  error: HttpErrorResponse,
): Observable<never> {
  const errorObj = error.error;

  if (error.status >= 400 && error.status <= 499) {
    if (KONG_MESSAGES.includes(errorObj.message || errorObj.exp)) {
      const data = {
        type: ESnackbarType.warning,
        message: 'Sessão expirada!',
      };
      openSnackBar(snackbar, data);
      loginService.logout();
    } else {
      const data = {
        type: ESnackbarType.error,
        message: errorObj.message || error.message,
      };
      openSnackBar(snackbar, data);
    }
  }

  return throwError(() => error);
}

function openSnackBar(
  snackbar: MatSnackBar,
  data: ISnackbarData,
  duration = 5000,
) {
  snackbar.openFromComponent<SnackbarComponent, ISnackbarData>(
    SnackbarComponent,
    {
      duration,
      data,
      panelClass: data.type,
      horizontalPosition: 'end',
    },
  );
}
