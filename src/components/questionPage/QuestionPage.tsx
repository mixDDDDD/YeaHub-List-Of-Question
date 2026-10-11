import { useEffect } from "react";
import { useQuestion } from "./hooks/useQuestion";
import { Icon } from "@/components/icon/Icon";
import { QuestionPageHeader } from "./questionPageHeader/QuestionPageHeader";
import { QuestionPageMeta } from "./questionPageMeta/QuestionPageMeta";
import { QuestionAnswerSection } from "./questionAnswerSection/QuestionAnswerSection";
import styles from "./questionPage.module.css";

type QuestionPageProps = {
  questionId: number;
};

export const QuestionPage = ({ questionId }: QuestionPageProps) => {
  const { question, isLoading, error, retry } = useQuestion(questionId);

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
            onClick={retry}
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
