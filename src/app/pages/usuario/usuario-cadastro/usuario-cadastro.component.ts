import { Component, Injector } from '@angular/core';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { BackActionComponent } from '../../../shared/components/action-bar/back-action/back-action.component';
import { SaveActionComponent } from '../../../shared/components/action-bar/save-action/save-action.component';
import { SaveAddActionComponent } from '../../../shared/components/action-bar/save-add-action/save-add-action.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPermissao, IUsuario } from '../usuario.interface';
import { UsuarioService } from '../usuario.service';
import { EFieldType } from '../../../shared/enums/field-type.enum';
import { CommonModule } from '@angular/common';
import { BaseCadastroComponent } from '../../../shared/classes/base-cadastro/base-cadastro.component';
import { FormFieldsListComponent } from '../../../shared/components/form-fields-list/form-fields-list.component';
import { IFormField } from '../../../shared/interfaces/form-field.interface';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { menuPermissao } from '../../../shared/constants/menu-permissao';
import { EMenuPermissao } from '../../../shared/enums/menu-permissao.enum';

const actions = [
  BackActionComponent,
  SaveActionComponent,
  SaveAddActionComponent,
  MatCheckboxModule,
];

@Component({
  selector: 'cl-usuario-cadastro',
  standalone: true,
  imports: [
    ...actions,
    PageLayoutComponent,
    FormFieldsListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './usuario-cadastro.component.html',
  styleUrl: './usuario-cadastro.component.scss',
})
export class UsuarioCadastroComponent extends BaseCadastroComponent<IUsuario> {
  constructor(
    private readonly _usuarioService: UsuarioService,
    protected override readonly _injector: Injector,
  ) {
    super(_usuarioService, _injector);
  }

  cadastroForm = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    nome: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    admin: new FormControl(false),
    ativo: new FormControl(true),
    senha: new FormControl('temporario'),
    permissao: new FormArray(this.buildPermissaoFormArrayFromEnum()),
  });

  get permissaoFormArray(): FormArray {
    return this.cadastroForm.get('permissao') as FormArray;
  }

  get permissaoFormArrayControls(): FormGroup[] {
    return this.permissaoFormArray.controls as FormGroup[];
  }

  get permissaoFormArrayValues(): IPermissao[] {
    return this.permissaoFormArray.getRawValue() as IPermissao[];
  }

  cadastroFields: IFormField[] = [
    {
      type: EFieldType.Input,
      class: 'grid-1',
      label: 'Código',
      formControlName: 'id',
      placeholder: '',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Nome',
      formControlName: 'nome',
      placeholder: 'Ex.: José',
    },
    {
      type: EFieldType.Input,
      class: 'grid-2',
      label: 'Email',
      formControlName: 'email',
      placeholder: 'Ex.: jose@email.com',
    },
    {
      type: EFieldType.Checkbox,
      class: 'grid-1',
      label: 'Admin',
      formControlName: 'admin',
      placeholder: '',
    },
  ];

  override get cadastroFormValues(): IUsuario {
    const formValues = super.cadastroFormValues;
    const permissao = this.formatPermissaoForSave();

    return { ...formValues, permissao };
  }

  private buildPermissaoFormArrayFromEnum() {
    const permissoes = [];

    for (const menuPermissaoItem of menuPermissao) {
      const form = new FormGroup({
        id: new FormControl<number | null>(null),
        idUsuario: new FormControl<number | null>(null),
        modulo: new FormControl<EMenuPermissao>(menuPermissaoItem.modulo),
        label: new FormControl<string>(menuPermissaoItem.label),
        checked: new FormControl<boolean>(false),
      });

      permissoes.push(form);
    }

    return permissoes;
  }

  private formatPermissaoForSave() {
    return this.permissaoFormArrayValues.filter((item) => item.checked);
  }

  protected override buildPatchValuesFormEdit(payload: IUsuario): IUsuario {
    return {
      ...payload,
      permissao: payload.permissao.map((item) => ({ ...item, checked: true })),
    };
  }
}
