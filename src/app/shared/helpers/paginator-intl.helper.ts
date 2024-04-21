import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPaginatorIntl(intl: MatPaginatorIntl) {
  return {
    ...intl,
    itemsPerPageLabel: 'Itens por página',
    nextPageLabel: 'Próxima página',
    previousPageLabel: 'Página anterior',
    firstPageLabel: 'Primeira página',
    lastPageLabel: 'Última página',
    getRangeLabel: (page: number, pageSize: number, length: number) => {
      const from = page * pageSize + 1;
      const to = page * pageSize + pageSize;
      const toOrLength = to > length ? length : to;

      return `${from}-${toOrLength} de ${length}`;
    },
  };
}
