import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { menuPermissao } from '../../constants/menu-permissao';
import { LoginService } from '../../../login/login.service';
import { IMenuPermissao } from '../../interfaces/menu-permissao.interface';

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'cl-menu',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _loginService: LoginService,
  ) {}

  menuPermissaoItems: IMenuPermissao[] = [];

  ngOnInit(): void {
    this.handleMenuPermissao();
  }

  private handleMenuPermissao() {
    const user = this._loginService.currentUser;

    if (!user) return;

    this.menuPermissaoItems = menuPermissao.filter((menuItem) => {
      const hasPermission = user.permissao.find((permissao) => {
        return permissao.modulo === menuItem.modulo;
      });

      return !!hasPermission;
    });
  }

  handleNavigation(path: string): void {
    this._router.navigateByUrl(path);
  }
}
