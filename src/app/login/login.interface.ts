export interface ILogin {
  email: string;
  senha: string;
}

export interface IUsuarioJWT {
  admin: boolean;
  email: string;
  id: number;
  nome: string;
  modulos: number[];
}
