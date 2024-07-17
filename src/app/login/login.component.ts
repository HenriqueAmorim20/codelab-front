import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormFieldComponent } from '../shared/components/form-field/form-field.component';
import { IFormField } from '../shared/interfaces/form-field.interface';
import { EFieldType } from '../shared/enums/field-type.enum';
import { ESnackbarType } from '../shared/enums/snackbar-type.enum';
import { ISnackbarData } from '../shared/interfaces/snackbar-data.interface';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';

const components = [
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  FormFieldComponent,
];

@Component({
  selector: 'cl-login',
  standalone: true,
  imports: [...components],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    senha: new FormControl<string | null>(null, [Validators.required]),
    lembrar: new FormControl<boolean>(false),
  });

  emailInput: IFormField = {
    type: EFieldType.Input,
    label: 'Email',
    formControlName: 'email',
    placeholder: 'Ex.: jose@gmail.com',
    class: '',
  };

  senhaInput: IFormField = {
    type: EFieldType.Input,
    label: 'Senha',
    formControlName: 'senha',
    placeholder: '******',
    class: '',
    password: true,
  };

  lembrarInput: IFormField = {
    type: EFieldType.Slide,
    label: 'Lembrar meu usuário',
    formControlName: 'lembrar',
    placeholder: '',
    class: '',
  };

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _loginService: LoginService,
  ) {}

  login($event: Event): void {
    $event.preventDefault();

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      this.openSnackBar({
        message: 'Email e senha devem ser preenchidos corretamente!',
        type: ESnackbarType.warning,
      });
      return;
    }

    const payload = {
      email: this.loginForm.value.email as string,
      senha: this.loginForm.value.senha as string,
    };

    this._loginService.login(payload);
  }

  protected openSnackBar(data: ISnackbarData, duration = 50000) {
    this._snackBar.openFromComponent<SnackbarComponent, ISnackbarData>(
      SnackbarComponent,
      {
        duration,
        data,
        panelClass: data.type,
        horizontalPosition: 'end',
      },
    );
  }
}
