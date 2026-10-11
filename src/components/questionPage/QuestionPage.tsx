import { useEffect, useId, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyDown } from "@/hooks/useKeyDown";
import { Icon } from "@/components/icon/Icon";
import { useQuestion } from "./hooks/useQuestion";
import { QuestionPageHeader } from "./questionPageHeader/QuestionPageHeader";
import { QuestionPageMeta } from "./questionPageMeta/QuestionPageMeta";
import { QuestionAnswerSection } from "./questionAnswerSection/QuestionAnswerSection";
import styles from "./questionPage.module.css";

type QuestionPageProps = {
  questionId: number;
};

export const QuestionPage = ({ questionId }: QuestionPageProps) => {
  const { question, isLoading, error, retry } = useQuestion(questionId);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const infoId = useId();
  const infoRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const toggleInfo = () => setIsInfoOpen((current) => !current);
  const closeInfo = () => setIsInfoOpen(false);
  const closeInfoAndFocus = () => {
    setIsInfoOpen(false);
    infoButtonRef.current?.focus();
  };

  useClickOutside<HTMLElement>([infoRef, infoButtonRef], closeInfo, isInfoOpen);
  useKeyDown("Escape", (event) => {
    event.preventDefault();
    closeInfoAndFocus();
  }, isInfoOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [questionId]);

  return (
    <main className={styles.page} aria-busy={isLoading}>
      <div className={styles.controls}>
        <a href="#questions" className={styles.back}>
          <Icon name="arrowRight" className={styles.backIcon} aria-hidden="true" />
          Назад
        </a>
        {question && !isLoading && !error && (
          <button
            ref={infoButtonRef}
            type="button"
            className={styles.infoToggle}
            aria-label={isInfoOpen ? "Закрыть информацию о вопросе" : "Открыть информацию о вопросе"}
            aria-expanded={isInfoOpen}
            aria-controls={infoId}
            onClick={toggleInfo}
          >
            <Icon name="filter" aria-hidden="true" />
          </button>
        )}
      </div>
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
          <div
            id={infoId}
            ref={infoRef}
            className={`${styles.info} ${isInfoOpen ? styles.infoOpen : ""}`}
          >
            <button
              type="button"
              className={styles.infoClose}
              aria-label="Закрыть информацию о вопросе"
              onClick={closeInfoAndFocus}
            >
              <Icon name="closeButton" aria-hidden="true" />
            </button>
            <QuestionPageMeta question={question} />
          </div>
        </>
      ) : null}
    </main>
  );
};
