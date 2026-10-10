import type { Question } from "@/components/questionsPage/data/question";
import styles from "./questionPageHeader.module.css";

type QuestionPageHeaderProps = {
  question: Question;
};

export const QuestionPageHeader = ({ question }: QuestionPageHeaderProps) => (
  <header className={styles.header}>
    {question.imageSrc && (
      <img src={question.imageSrc} alt="" className={styles.image} />
    )}
    <div className={styles.text}>
      <h1 className={styles.title}>{question.title}</h1>
      {question.description && (
        <p className={styles.description}>{question.description}</p>
      )}
    </div>
  </header>
);
