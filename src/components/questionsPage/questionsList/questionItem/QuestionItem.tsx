import { useId, useState } from "react";
import clsx from "clsx";
import { Icon } from "@/components/icon/Icon";
import type { Question } from "@/components/questionsPage/data/question";
import styles from "./questionItem.module.css";
import { QuestionDetails } from "@/components/questionsPage/questionsList/questionItem/QuestionDetails";

type QuestionItemProps = {
  question: Question;
};

export const QuestionItem = ({ question }: QuestionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <li className={clsx(styles["question-item"], isOpen && styles["question-item--open"])}>
      <button
        type="button"
        className={styles["question-item__trigger"]}
        onClick={handleToggle}
        aria-controls={panelId}
        aria-expanded={isOpen}
      >
        <span className={styles["question-item__title"]}>
          <Icon
            name="ellipse"
            aria-hidden="true"
            className={styles["question-item__marker"]}
          />
          {question.title}
        </span>
        <Icon
          name="chevronBottom"
          className={styles["question-item__chevron"]}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        className={`${styles["question-item__panel"]} ${
          isOpen ? styles["question-item__panel--open"] : ""
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className={styles["question-item__panel-inner"]}>
          <QuestionDetails question={question} />
        </div>
      </div>
    </li>
  );
};
