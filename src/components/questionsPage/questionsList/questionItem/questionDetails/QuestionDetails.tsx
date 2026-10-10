import type { Question } from "@/components/questionsPage/data/question";
import { QuestionAnswer } from "@/components/questionsPage/questionsList/questionItem/questionAnswer/QuestionAnswer";
import styles from "./questionDetails.module.css";
import { Icon } from "@/components/icon/Icon";

type QuestionDetailsProps = {
  question: Question;
};

export const QuestionDetails = ({ question }: QuestionDetailsProps) => {
  return (
    <div className={styles["question-details"]}>
      <dl className={styles["question-details__meta"]}>
        <div className={styles["question-details__meta-item"]}>
          <dt className={styles["question-details__meta-label"]}>Рейтинг:</dt>
          <dd className={styles["question-details__meta-value"]}>
            {question.rate}
          </dd>
        </div>
        <div className={styles["question-details__meta-item"]}>
          <dt className={styles["question-details__meta-label"]}>Сложность:</dt>
          <dd className={styles["question-details__meta-value"]}>
            {question.complexity}
          </dd>
        </div>
      </dl>
      <QuestionAnswer answer={question.shortAnswer} />
      <a
        href={`#/questions/${question.id}`}
        className={styles["question-detail__full-answer"]}
      >
        Подробнее
        <Icon name="arrowRight" aria-hidden="true" />
      </a>
    </div>
  );
};
