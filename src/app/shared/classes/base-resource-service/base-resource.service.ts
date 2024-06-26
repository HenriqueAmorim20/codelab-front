import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { IResponse } from '../../interfaces/find-all-response.interface';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { handleFindAllFilter } from '../../helpers/filter.helper';

@Injectable({ providedIn: 'root' })
export abstract class BaseResourceService<TData> {
  protected readonly http: HttpClient;
  protected url!: string;

  constructor(
    protected readonly _injector: Injector,
    path: string,
    host: number,
  ) {
    this.http = this._injector.get(HttpClient);
    this.url = `http://localhost:${host}/api/v1/${path}`;
  }

  findAll(
    page: PageEvent,
    sort: Sort,
    filter: Record<string, unknown>,
  ): Observable<IResponse<TData[]>> {
    const pageParam = page.pageIndex;
    const sizeParam = page.pageSize;
    const orderParam = JSON.stringify({
      column: sort.active,
      dir: sort.direction,
    });
    const filterQuery = handleFindAllFilter(filter);

    return this.http
      .get<
        IResponse<TData[]>
      >(`${this.url}/${pageParam}/${sizeParam}/${orderParam}?filter=${filterQuery}`)
      .pipe(take(1));
  }

  create(data: TData): Observable<IResponse<TData>> {
    return this.http.post<IResponse<TData>>(this.url, data).pipe(take(1));
  }

  updateById(id: number, data: TData): Observable<IResponse<TData>> {
    return this.http
      .patch<IResponse<TData>>(`${this.url}/${id}`, data)
      .pipe(take(1));
  }

  findOneById(id: number): Observable<IResponse<TData>> {
    return this.http.get<IResponse<TData>>(`${this.url}/${id}`).pipe(take(1));
  }
}
