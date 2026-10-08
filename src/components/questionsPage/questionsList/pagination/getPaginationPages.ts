type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export const getPaginationPages = (page: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 0) return [];

  if (totalPages <= 8) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 5) {
    return [1, 2, 3, 4, 5, 6, "ellipsis-end", totalPages];
  }

  if (page >= totalPages - 4) {
    return [
      1,
      "ellipsis-start",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis-start", page - 1, page, page + 1, page + 2, "ellipsis-end", totalPages];
};
