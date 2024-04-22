import { Component, Injector } from '@angular/core';
import { BaseResourceService } from '../base-resource-service/base-resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { IFormField } from '../../interfaces/form-field.interface';

@Component({ template: '' })
export abstract class BaseCadastroComponent<TData extends { id: number }> {
  private readonly _router!: Router;
  private readonly _route!: ActivatedRoute;

  constructor(
    private readonly _service: BaseResourceService<TData>,
    protected readonly _injector: Injector,
  ) {
    this._router = this._injector.get(Router);
    this._route = this._injector.get(ActivatedRoute);
  }

  abstract cadastroForm: FormGroup;

  get cadastroFormValues(): TData {
    return this.cadastroForm.getRawValue() as TData;
  }

  abstract cadastroFields: IFormField[];

  save(addNew = false) {
    this.cadastroForm.markAllAsTouched();

    if (!this.cadastroForm.valid) {
      return;
    }

    this._service.create(this.cadastroFormValues).then(({ id }) => {
      if (addNew) {
        this.cadastroForm.reset();
      } else {
        this._router.navigate([`../editar/${id}`], { relativeTo: this._route });
      }
    });
  }
}
