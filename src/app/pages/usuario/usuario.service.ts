import { Injectable, Injector } from '@angular/core';
import { IUsuario } from './usuario.interface';
import { BaseResourceService } from '../../shared/classes/base-resource-service/base-resource.service';
import { EAPIPath } from '../../shared/enums/api-info.enum';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseResourceService<IUsuario> {
  constructor(protected readonly _injectorLocal: Injector) {
    super(_injectorLocal, EAPIPath.usuario);
  }
}
