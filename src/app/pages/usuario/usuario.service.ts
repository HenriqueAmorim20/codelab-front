import { Injectable } from '@angular/core';
import { IUsuario } from './usuario.interface';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseResourceService<IUsuario> {
  mockedData: IUsuario[] = [
    {
      id: 1,
      nome: 'Henrique',
      email: 'henrique@gmail.com',
      admin: true,
    },
    {
      id: 2,
      nome: 'Jose',
      email: 'jose@gmail.com',
      admin: true,
    },
    {
      id: 3,
      nome: 'Maria',
      email: 'Maria@gmail.com',
      admin: false,
    },
    {
      id: 4,
      nome: 'Gustavo',
      email: 'Gustavo@gmail.com',
      admin: true,
    },
    {
      id: 5,
      nome: 'Emerson',
      email: 'Emerson@gmail.com',
      admin: false,
    },
    {
      id: 6,
      nome: 'Wendell',
      email: 'Wendell@gmail.com',
      admin: true,
    },
    {
      id: 7,
      nome: 'Carlos',
      email: 'Carlos@gmail.com',
      admin: false,
    },
    {
      id: 8,
      nome: 'Allan',
      email: 'Allan@gmail.com',
      admin: false,
    },
    {
      id: 9,
      nome: 'Savio',
      email: 'Savio@gmail.com',
      admin: true,
    },
    {
      id: 10,
      nome: 'Leandro',
      email: 'Leandro@gmail.com',
      admin: true,
    },
    {
      id: 11,
      nome: 'Gabriel',
      email: 'Gabriel@gmail.com',
      admin: false,
    },
    {
      id: 12,
      nome: 'Andre',
      email: 'Andre@gmail.com',
      admin: false,
    },
  ];
}
