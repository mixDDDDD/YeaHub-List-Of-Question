import { useEffect, useState } from "react";
import { getPublicQuestions } from "@/api/questions";
import { QuestionsList } from "./questionsList/QuestionsList";
import { QuestionsPanel } from "./questionsPanel/QuestionsPanel";
import styles from "./questionsPage.module.css";
import type { Question } from "./data/question";

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPublicQuestions(
          page,
          limit,
          controller.signal,
        );
        if (controller.signal.aborted) return;
        setQuestions(response.data);
        setTotal(response.total ?? 0);
      } catch (requestError) {
        if (controller.signal.aborted) return;

        setError(
          requestError instanceof TypeError
            ? "Не удалось загрузить вопросы. Проверьте подключение и повторите попытку."
            : requestError instanceof Error
            ? requestError.message
            : "Не удалось загрузить вопросы",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadQuestions();

    return () => controller.abort();
  }, [page, retryCount]);

  const totalPages = Math.ceil(total / limit);

  return (
    <main id="questions" className={styles["questions-page"]}>
      <QuestionsList
        questions={questions}
        isLoading={isLoading}
        error={error}
        onRetry={() => setRetryCount((count) => count + 1)}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <QuestionsPanel />
    </main>
  );
};
