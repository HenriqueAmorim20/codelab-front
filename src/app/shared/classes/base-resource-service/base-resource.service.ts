import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { filterSortPageData } from '../../helpers/table.helper';
import { IFindAllResponse } from '../../interfaces/find-all-response.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export abstract class BaseResourceService<TData> {
  abstract mockedData: TData[];

  findAll(
    page: PageEvent,
    sort: Sort,
    filter: Record<string, unknown>,
  ): Promise<IFindAllResponse<TData>> {
    const sortedFilteredData = filterSortPageData(
      this.mockedData,
      page,
      sort,
      filter,
    );

    return Promise.resolve({
      message: '',
      data: sortedFilteredData,
      count: this.mockedData.length,
    });
  }

  create(data: TData): Promise<TData> {
    return Promise.resolve({ ...data, id: 1 });
  }

  updateById(id: number, data: TData): Promise<TData> {
    return Promise.resolve({ ...data, id: 1 });
  }

  findOneById(id: number): Promise<TData | undefined> {
    // Gambiarra por não ter o back;
    const data = this.mockedData as (TData & { id: number })[];
    const value = data.find((item) => item.id === +id);
    return Promise.resolve(value);
  }
}
