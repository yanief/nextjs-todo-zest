export interface PaginateParams {
  page: number;
  pageSize: number;
}

export function paginate<T>(items: T[], { page, pageSize }: PaginateParams) {
  const total = items.length;
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    total,
    page: safePage,
    pageSize,
  };
}

export function getTotalPages(total: number, pageSize: number) {
  if (pageSize <= 0) {
    return 0;
  }
  return Math.max(1, Math.ceil(total / pageSize));
}
