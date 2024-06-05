import { FormControl } from '@angular/forms';

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
}

export interface IUsuarioForm {
  id: FormControl<number | null>;
  nome: FormControl<string | null>;
  email: FormControl<string | null>;
  admin: FormControl<number | null>;
}
