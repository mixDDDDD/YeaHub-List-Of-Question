import type { Question } from "@/components/questionsPage/data/question";
import { QuestionAnswer } from "./questionAnswer/QuestionAnswer";
import styles from "./questionDetails.module.css";

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
      <QuestionAnswer answer={question.longAnswer} code={question.code} />
    </div>
  );
};
