import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { getPaginatorIntl } from '../../helpers/paginator-intl.helper';
import { FormGroup } from '@angular/forms';
import { BaseResourceService } from '../base-resource-service/base-resource.service';
import { IFormField } from '../../interfaces/form-field.interface';

@Component({ template: '' })
export abstract class BaseConsultaComponent<TData>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginatorEl!: MatPaginator;

  abstract displayedColumns: string[];
  dataSource = new MatTableDataSource<TData>([]);

  sort: Sort = { active: 'id', direction: '' };
  page: PageEvent = { pageIndex: 0, pageSize: 5, length: 0 };

  abstract filterFields: IFormField[];
  abstract filterFormGroup: FormGroup;

  get filterValues() {
    return this.filterFormGroup.getRawValue();
  }

  loading = false;

  constructor(private readonly _service: BaseResourceService<TData>) {}

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit(): void {
    this.paginatorEl._intl = getPaginatorIntl(this.paginatorEl._intl);
  }

  applySort(sort: Sort) {
    this.sort = sort;
    this.search();
  }

  applyPage(page: PageEvent) {
    this.page = page;
    this.search();
  }

  search() {
    this.loading = true;

    this._service
      .findAll(this.page, this.sort, this.filterValues)
      .then((res) => {
        this.dataSource.data = res.data;
        this.paginatorEl.length = res.count;
      })
      .finally(() => {
        setTimeout(() => (this.loading = false), 2000);
      });
  }
}