import { EMenuPermissao } from '../../shared/enums/menu-permissao.enum';

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  permissao: IPermissao[];
}

export interface IPermissao {
  id: number;
  modulo: EMenuPermissao;
  idUsuario: number;
  label?: string;
  checked?: boolean;
}
