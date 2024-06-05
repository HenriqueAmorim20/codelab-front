import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

export function filterSortPageData<T>(
  data: T[],
  page: PageEvent,
  sort: Sort,
  filter: Record<string, unknown>,
): T[] {
  const filtered = filterData(data, filter);
  const sorted = sortData(filtered, sort);
  return pageData(sorted, page);
}

export function removeFilterEmptyValues(
  filter: Record<string, unknown>,
): Record<string, unknown> {
  Object.keys(filter).forEach((key) => {
    const value = filter[key];

    if (value === undefined || value === null) {
      delete filter[key];
    }
  });

  return filter;
}

export function filterData<T>(data: T[], filter: Record<string, unknown>): T[] {
  const notEmptyFilter = removeFilterEmptyValues(filter);
  return data;
}

export function sortData<T>(data: T[], sort: Sort): T[] {
  const column = sort.active as keyof T;
  const modifier = sort.direction === 'desc' ? -1 : 1;
  return data.sort((a: T, b: T) => {
    if (a[column] > b[column]) {
      return modifier;
    }

    if (a[column] < b[column]) {
      return -modifier;
    }

    return 0;
  });
}

export function pageData<T>(data: T[], page: PageEvent): T[] {
  const startIndex = page.pageSize * page.pageIndex;
  const endIndex = startIndex + page.pageSize;

  return data.slice(startIndex, endIndex);
}
