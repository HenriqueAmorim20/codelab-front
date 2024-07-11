import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { IResponse } from '../../interfaces/response.interface';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { handleFindAllFilter } from '../../helpers/filter.helper';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export abstract class BaseResourceService<TData> {
  private readonly _http!: HttpClient;
  private url!: string;

  constructor(
    protected readonly _injector: Injector,
    path: string,
  ) {
    this._http = this._injector.get(HttpClient);
    this.url = `${environment.baseUrl}/${path}`;
  }

  findAll(
    page: PageEvent,
    sort: Sort,
    filter: Record<string, unknown>,
  ): Observable<IResponse<TData[]>> {
    const orderParam = JSON.stringify({
      column: sort.active,
      sort: sort.direction,
    });
    const pageParam = page.pageIndex;
    const sizeParam = page.pageSize;
    const filterQuery = handleFindAllFilter(filter);

    return this._http
      .get<
        IResponse<TData[]>
      >(`${this.url}/${pageParam}/${sizeParam}/${orderParam}?filter=${filterQuery}`)
      .pipe(take(1));
  }

  create(data: TData): Observable<IResponse<TData>> {
    return this._http.post<IResponse<TData>>(this.url, data).pipe(take(1));
  }

  updateById(id: number, data: TData): Observable<IResponse<TData>> {
    return this._http
      .patch<IResponse<TData>>(`${this.url}/${id}`, data)
      .pipe(take(1));
  }

  findOneById(id: number): Observable<IResponse<TData>> {
    return this._http.get<IResponse<TData>>(`${this.url}/${id}`).pipe(take(1));
  }
}
