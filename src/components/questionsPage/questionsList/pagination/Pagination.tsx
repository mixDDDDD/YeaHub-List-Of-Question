import { Icon } from "@/components/icon/Icon";
import { getPaginationPages } from "./getPaginationPages";
import styles from "./pagination.module.css";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const visiblePages = getPaginationPages(page, totalPages);

  const handlePageChange = (nextPage: number) => {
    if (disabled || nextPage === page || nextPage < 1 || nextPage > totalPages) return;
    onPageChange(nextPage);
  };

  return (
    <nav className={styles["pagination"]} aria-label="Пагинация вопросов">
      <button
        type="button"
        className={`${styles["pagination__arrow"]} ${page <= 1 ? styles["pagination__arrow--unavailable"] : ""}`}
        aria-label="Предыдущая страница"
        disabled={disabled || page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <Icon name="arrowLeft" aria-hidden="true" />
      </button>

      <ul className={styles["pagination__pages"]}>
        {visiblePages.map((pageNumber) => (
          <li key={pageNumber} className={styles["pagination__item"]}>
            {typeof pageNumber === "number" ? (
              <button
                type="button"
                className={`${styles["pagination__page"]} ${
                  pageNumber === page ? styles["pagination__page--active"] : ""
                }`}
                aria-label={`Страница ${pageNumber}`}
                aria-current={pageNumber === page ? "page" : undefined}
                disabled={disabled}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ) : (
              <span className={styles["pagination__ellipsis"]} aria-hidden="true">
                ⋯
              </span>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`${styles["pagination__arrow"]} ${page >= totalPages ? styles["pagination__arrow--unavailable"] : ""}`}
        aria-label="Следующая страница"
        disabled={disabled || page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <Icon name="arrowRight" aria-hidden="true" />
      </button>
    </nav>
  );
};
