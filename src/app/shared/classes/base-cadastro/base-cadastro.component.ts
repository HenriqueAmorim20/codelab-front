import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceService } from '../base-resource-service/base-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IFormField } from '../../interfaces/form-field.interface';

@Component({ template: '' })
export abstract class BaseCadastroComponent<TData extends { id: number }>
  implements OnInit
{
  abstract cadastroFields: IFormField[];
  abstract cadastroForm: FormGroup;

  get cadastroFormValues(): TData {
    return this.cadastroForm.getRawValue() as TData;
  }

  protected idEdit!: number;

  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;

  constructor(
    private readonly _service: BaseResourceService<TData>,
    protected readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.handleEdit();
  }

  protected handleEdit(): void {
    this.idEdit = this._route.snapshot.params['id'];

    if (!this.idEdit) {
      return;
    }

    this._service.findOneById(this.idEdit).then((res) => {
      if (!res) {
        return this.navigateToCadastro();
      }

      this.patchFormForEdit(res);
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
      .then((response) => {
        if (addNew) {
          this.navigateToCadastro();
        } else {
          this.actionsAfterUpdate(response);
        }
      });
  }

  protected actionsAfterUpdate(data: TData): void {
    // empty
    console.log(data);
  }

  protected saveCadastro(addNew: boolean): void {
    this._service.create(this.cadastroFormValues).then(({ id }) => {
      if (addNew) {
        this.cadastroForm.reset();
      } else {
        this._router.navigate([`../editar/${id}`], { relativeTo: this._route });
      }
    });
  }
}
