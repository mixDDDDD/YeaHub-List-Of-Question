import { useId, useState } from "react";
import { specializations } from "@/components/questionsPage/data/specializations";
import styles from "./questionSpecializations.module.css";

type QuestionSpecializationsProps = {
  selectedSpecializationId: number | null;
  onSpecializationChange: (id: number) => void;
};

export const QuestionSpecializations = ({
  selectedSpecializationId,
  onSpecializationChange,
}: QuestionSpecializationsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listId = useId();
  const selectedSpecialization = specializations.find(
    (item) => item.id === selectedSpecializationId,
  );
  const collapsedSpecializations = specializations.slice(0, 5);
  if (
    selectedSpecialization &&
    !collapsedSpecializations.some((item) => item.id === selectedSpecializationId)
  ) {
    collapsedSpecializations[4] = selectedSpecialization;
  }
  const visibleSpecializations = isExpanded
    ? specializations
    : collapsedSpecializations;

  return (
    <section className={styles.specializations} aria-label="Специализация">
      <h2 className={styles.title}>Специализация</h2>
      <div
        id={listId}
        className={`${styles.list} ${isExpanded ? styles.expanded : ""}`}
      >
        {visibleSpecializations.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.option}
            aria-pressed={item.id === selectedSpecializationId}
            onClick={() => onSpecializationChange(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.more}
        aria-expanded={isExpanded}
        aria-controls={listId}
        onClick={() => setIsExpanded((current) => !current)}
      >
        {isExpanded ? "Скрыть" : "Посмотреть все"}
      </button>
    </section>
  );
};
