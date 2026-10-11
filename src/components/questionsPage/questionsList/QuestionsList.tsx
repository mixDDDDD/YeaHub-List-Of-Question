import type { Question } from "@/components/questionsPage/data/question";
import { QuestionItem } from "./questionItem/QuestionItem";
import styles from "./questionsList.module.css";
import { Pagination } from "@/components/questionsPage/questionsList/pagination/Pagination";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { Icon } from "@/components/icon/Icon";

type QuestionsListProps = {
  title?: string;
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onRetry: () => void;
  onPageChange: (page: number) => void;
  isFiltersOpen: boolean;
  filtersId: string;
  filtersButtonRef: RefObject<HTMLButtonElement | null>;
  onFiltersToggle: () => void;
};

export const QuestionsList = ({
  title = "Вопросы",
  questions,
  isLoading,
  error,
  page,
  totalPages,
  onPageChange,
  onRetry,
  isFiltersOpen,
  filtersId,
  filtersButtonRef,
  onFiltersToggle,
}: QuestionsListProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const paginationTop = useRef<number | null>(null);

  const handlePageChange = (nextPage: number) => {
    paginationTop.current =
      paginationRef.current?.getBoundingClientRect().top ?? null;
    onPageChange(nextPage);
  };

  useLayoutEffect(() => {
    if (isLoading || paginationTop.current === null || !paginationRef.current)
      return;
    const difference =
      paginationRef.current.getBoundingClientRect().top - paginationTop.current;
    window.scrollBy({ top: difference, behavior: "instant" });
    paginationTop.current = null;
  }, [questions, isLoading, error]);

  return (
    <div className={styles["questions-list"]}>
      <div className={styles["questions-list__content"]} aria-busy={isLoading}>
        <div className={styles["questions-list__header"]}>
          <h1 className={styles["questions-list__title"]}>{title}</h1>
          <button
            ref={filtersButtonRef}
            type="button"
            className={styles["questions-list__filters-toggle"]}
            aria-label={isFiltersOpen ? "Закрыть фильтры" : "Открыть фильтры"}
            aria-expanded={isFiltersOpen}
            aria-controls={filtersId}
            onClick={onFiltersToggle}
          >
            <Icon name={isFiltersOpen ? "closeButton" : "filter"} aria-hidden="true" />
          </button>
        </div>
        {isLoading && questions.length === 0 ? (
          <p className={styles["questions-list__message"]} role="status">
            Загружаем вопросы…
          </p>
        ) : error ? (
          <div className={styles["questions-list__message"]} role="alert">
            <p>{error}</p>
            <button
              className={styles["questions-list__retry"]}
              type="button"
              onClick={onRetry}
            >
              Повторить
            </button>
          </div>
        ) : questions.length === 0 ? (
          <p className={styles["questions-list__message"]}>
            Вопросы не найдены
          </p>
        ) : (
          <ul className={styles["questions-list__items"]}>
            {questions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
          </ul>
        )}
      </div>
      <div ref={paginationRef}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={isLoading || Boolean(error)}
        />
      </div>
    </div>
  );
};
