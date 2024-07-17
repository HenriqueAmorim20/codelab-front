import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ILogin } from './login.interface';
import { BehaviorSubject } from 'rxjs';
import { IUsuario } from '../pages/usuario/usuario.interface';
import { Router } from '@angular/router';

const JWT_KEY = 'jwt-key';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // private url = `${environment.baseUrl}/${EAPIPath.usuario}/auth`;

  // constructor(private readonly _http: HttpClient) {}
  constructor(private readonly _router: Router) {
    this.handleCurrentSession();
  }

  JWTHelper = new JwtHelperService();
  currentUserSubject = new BehaviorSubject<IUsuario | null>(null);

  get currentUser(): IUsuario | null {
    return this.currentUserSubject.getValue();
  }

  private handleCurrentSession(): void {
    const jwt: string | null = this.getLocalStorage(JWT_KEY);

    if (!jwt) return;

    try {
      const user: IUsuario | null = this.JWTHelper.decodeToken(jwt);
      this.currentUserSubject.next(user);
    } catch (error) {
      this.logout();
    }
  }

  login(payload: ILogin) {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJoZW5yaXF1ZUBnbWFpbC5jb20iLCJub21lIjoiSGVucmlxdWUgTWVsbyIsImFkbWluIjp0cnVlLCJwZXJtaXNzYW8iOlt7ImlkIjoxLCJtb2R1bG8iOjEsImlkVXN1YXJpbyI6MX0seyJpZCI6MiwibW9kdWxvIjoyLCJpZFVzdWFyaW8iOjF9XX0.3eY6ATx2AYlnJMcGy6xKF1gpL77udxUWcLrUtN0jTO8';
    this.handleLogin(jwt);
    // return this._http
    //   .post<IResponse<string>>(`${this.url}/login`, payload)
    //   .pipe(
    //     take(1),
    //     tap((response) => this.handleLogin(response.data)),
    //   );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.removeLocalStorage(JWT_KEY);
    this._router.navigate(['/login']);
  }

  private removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  private setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  private handleLogin(jwt: string) {
    const user: IUsuario | null = this.JWTHelper.decodeToken(jwt);
    this.currentUserSubject.next(user);
    this.setLocalStorage(JWT_KEY, jwt);
    this._router.navigate(['/']);
  }
}
