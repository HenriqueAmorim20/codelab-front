export type IFindAllFilterValue = string | number | boolean | null | undefined;

export interface IFindAllFilter {
  column: string;
  value: IFindAllFilterValue;
}

export function handleFindAllFilter(
  originalFilter: Record<string, unknown>,
): string {
  const filters: IFindAllFilter[] = [];

  Object.keys(originalFilter).forEach((column) => {
    const value = originalFilter[column] as IFindAllFilterValue;

    if (typeof value !== 'boolean' && !value) return;

    filters.push({ column, value });
  });

  return JSON.stringify(filters);
}
