import type { Question } from "@/components/questionsPage/data/question";
import { QuestionItem } from "./questionItem/QuestionItem";
import styles from "./questionsList.module.css";
import { Pagination } from "@/components/questionsPage/questionsList/pagination/Pagination";

type QuestionsListProps = {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  onRetry: () => void;
  onPageChange: (page: number) => void;
};

export const QuestionsList = ({
  questions,
  isLoading,
  error,
  page,
  totalPages,
  onPageChange,
  onRetry,
}: QuestionsListProps) => {
  return (
    <div className={styles["questions-list"]}>
      <div className={styles["questions-list__content"]} aria-busy={isLoading}>
        <h1 className={styles["questions-list__title"]}>
          Вопросы React, JavaScript
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={isLoading || Boolean(error)}
      />
    </div>
  );
};
