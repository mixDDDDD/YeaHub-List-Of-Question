import { useId } from "react";
import { QuestionAnswer } from "@/components/questionsPage/questionsList/questionItem/questionAnswer/QuestionAnswer";
import styles from "./questionAnswerSection.module.css";

type QuestionAnswerSectionProps = {
  title: string;
  answer: string;
  code?: string | null;
};

export const QuestionAnswerSection = ({
  title,
  answer,
  code,
}: QuestionAnswerSectionProps) => {
  const titleId = useId();

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {answer || code ? (
        <QuestionAnswer answer={answer} code={code} />
      ) : (
        <p className={styles.empty}>Ответ пока не добавлен.</p>
      )}
    </section>
  );
};
