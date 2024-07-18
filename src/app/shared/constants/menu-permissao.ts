import { EMenuPermissao } from '../enums/menu-permissao.enum';
import { IMenuPermissao } from '../interfaces/menu-permissao.interface';

export const menuPermissao: IMenuPermissao[] = [
  {
    label: 'Home',
    icon: 'home',
    path: '/',
    modulo: EMenuPermissao.Home,
  },
  {
    label: 'Usuário',
    icon: 'person',
    path: '/usuario',
    modulo: EMenuPermissao.Usuario,
  },
  {
    label: 'Produto',
    icon: 'shopping_cart',
    path: '/produto',
    modulo: EMenuPermissao.Produto,
  },
  {
    label: 'Pessoa',
    icon: 'people',
    path: '/pessoa',
    modulo: EMenuPermissao.Pessoa,
  },
  {
    label: 'Venda',
    icon: 'shopping_bag',
    path: '/venda',
    modulo: EMenuPermissao.Venda,
  },
  {
    label: 'Recebimento',
    icon: 'download',
    path: '/recebimento',
    modulo: EMenuPermissao.Recebimento,
  },
];
