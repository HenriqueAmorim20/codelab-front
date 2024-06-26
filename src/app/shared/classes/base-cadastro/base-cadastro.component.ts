import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceService } from '../base-resource-service/base-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IFormField } from '../../interfaces/form-field.interface';
import {
  CanComponentDeactivate,
  TCanDeactivate,
} from '../../guards/pending-changes.guard';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({ template: '' })
export abstract class BaseCadastroComponent<TData extends { id: number }>
  implements OnInit, CanComponentDeactivate
{
  abstract cadastroFields: IFormField[];
  abstract cadastroForm: FormGroup;

  get cadastroFormValues(): TData {
    return this.cadastroForm.getRawValue() as TData;
  }

  protected initialFormValues!: TData;
  protected idEdit!: number;

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;
  private readonly _dialog!: MatDialog;
  private readonly _snackBar!: MatSnackBar;

  constructor(
    private readonly _service: BaseResourceService<TData>,
    protected readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
    this._dialog = this._injector.get(MatDialog);
    this._snackBar = this._injector.get(MatSnackBar);
  }

  ngOnInit(): void {
    this.handleEdit();
  }

  protected handleEdit(): void {
    this.idEdit = this._route.snapshot.params['id'];

    if (!this.idEdit) {
      return;
    }

    this._service.findOneById(this.idEdit).subscribe((res) => {
      if (!res) {
        return this.navigateToCadastro();
      }

      this.patchFormForEdit(res.data);
    });
  }

  protected patchFormForEdit(payload: TData): void {
    const values = this.buildPatchValuesFormEdit(payload);
    this.cadastroForm.patchValue({ ...values });
  }

  protected buildPatchValuesFormEdit(payload: TData): TData {
    return payload;
  }

  protected navigateToCadastro(): void {
    this._router.navigate([`../../cadastro`], { relativeTo: this._route });
  }

  save(addNew = false) {
    this.cadastroForm.markAllAsTouched();

    if (!this.cadastroForm.valid) {
      return;
    }

    this.idEdit ? this.saveEditar(addNew) : this.saveCadastro(addNew);
  }

  protected saveEditar(addNew: boolean): void {
    this._service
      .updateById(this.idEdit, this.cadastroFormValues)
      .subscribe((response) => {
        this.openSnackBar('success');
        this.cadastroForm.markAsUntouched();

        if (addNew) {
          this.navigateToCadastro();
        } else {
          this.actionsAfterUpdate(response.data);
        }
      });
  }

  protected actionsAfterUpdate(data: TData): void {
    this.cadastroForm.markAsUntouched();
  }

  protected saveCadastro(addNew: boolean): void {
    this._service.create(this.cadastroFormValues).subscribe((response) => {
      this.openSnackBar('success');
      this.cadastroForm.markAsUntouched();
      const id = response.data.id;

      if (addNew) {
        this.cadastroForm.reset();
      } else {
        this._router.navigate([`../editar/${id}`], { relativeTo: this._route });
      }
    });
  }

  canDeactivate(): TCanDeactivate {
    if (!this.cadastroForm.touched) return true;

    const ref = this._dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        title: 'Alterações Pendentes',
        contentText:
          'Você possui alterações que não foram salvas, deseja mesmo sair da página?',
      },
    });

    return ref.afterClosed();
  }

  protected openSnackBar(panelClass: string | string[]) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 150000,
      panelClass,
    });
  }
}
