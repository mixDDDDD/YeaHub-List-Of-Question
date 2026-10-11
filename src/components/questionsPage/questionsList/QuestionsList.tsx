import type { Question } from "@/components/questionsPage/data/question";
import { QuestionItem } from "./questionItem/QuestionItem";
import styles from "./questionsList.module.css";
import { Pagination } from "@/components/questionsPage/questionsList/pagination/Pagination";
import { useLayoutEffect, useRef } from "react";

type QuestionsListProps = {
  title?: string;
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onRetry: () => void;
  onPageChange: (page: number) => void;
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
}: QuestionsListProps) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const paginationTop = useRef<number | null>(null);

  const handlePageChange = (nextPage: number) => {
    paginationTop.current = paginationRef.current?.getBoundingClientRect().top ?? null;
    onPageChange(nextPage);
  };

  useLayoutEffect(() => {
    if (isLoading || paginationTop.current === null || !paginationRef.current) return;
    const difference = paginationRef.current.getBoundingClientRect().top - paginationTop.current;
    window.scrollBy({ top: difference, behavior: "instant" });
    paginationTop.current = null;
  }, [questions, isLoading, error]);

  return (
    <div className={styles["questions-list"]}>
      <div className={styles["questions-list__content"]} aria-busy={isLoading}>
        <h1 className={styles["questions-list__title"]}>
          {title}
        </h1>
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
