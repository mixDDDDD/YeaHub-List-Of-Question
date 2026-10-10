import { useEffect, useState } from "react";
import { getPublicQuestion } from "@/api/questions";
import { Icon } from "@/components/icon/Icon";
import type { Question } from "@/components/questionsPage/data/question";
import { QuestionPageHeader } from "./questionPageHeader/QuestionPageHeader";
import { QuestionPageMeta } from "./questionPageMeta/QuestionPageMeta";
import { QuestionAnswerSection } from "./questionAnswerSection/QuestionAnswerSection";
import styles from "./questionPage.module.css";

type QuestionPageProps = {
  questionId: number;
};

export const QuestionPage = ({ questionId }: QuestionPageProps) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestion = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPublicQuestion(questionId, controller.signal);
        if (!controller.signal.aborted) setQuestion(data);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(
          requestError instanceof TypeError
            ? "Не удалось загрузить вопрос. Проверьте подключение и повторите попытку."
            : requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить вопрос",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadQuestion();
    return () => controller.abort();
  }, [questionId, retryCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  return (
    <main className={styles.page} aria-busy={isLoading}>
      <a href="#questions" className={styles.back}>
        <Icon name="arrowRight" className={styles.backIcon} aria-hidden="true" />
        Назад
      </a>
      {isLoading ? (
        <p className={styles.message} role="status">
          Загружаем вопрос…
        </p>
      ) : error ? (
        <div className={styles.message} role="alert">
          <p>{error}</p>
          <button
            type="button"
            className={styles.retry}
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Повторить
          </button>
        </div>
      ) : question ? (
        <>
          <div className={styles.content}>
            <QuestionPageHeader question={question} />
            <QuestionAnswerSection
              title="Краткий ответ"
              answer={question.shortAnswer}
            />
            <QuestionAnswerSection
              title="Развёрнутый ответ"
              answer={question.longAnswer}
              code={question.code}
            />
          </div>
          <QuestionPageMeta question={question} />
        </>
      ) : null}
    </main>
  );
};
