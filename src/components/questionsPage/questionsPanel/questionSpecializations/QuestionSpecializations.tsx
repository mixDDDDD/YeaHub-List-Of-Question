import { useId, useState } from "react";
import type { QuestionSpecializationOption } from "@/components/questionsPage/data/question";
import styles from "./questionSpecializations.module.css";

type QuestionSpecializationsProps = {
  specializations: QuestionSpecializationOption[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  selectedSpecializationId: number | null;
  onSpecializationChange: (id: number) => void;
};

export const QuestionSpecializations = ({
  specializations,
  isLoading,
  error,
  onRetry,
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
      {isLoading ? (
        <p role="status">Загружаем специализации…</p>
      ) : error ? (
        <div role="alert">
          <p>{error}</p>
          <button type="button" onClick={onRetry}>Повторить</button>
        </div>
      ) : specializations.length === 0 ? (
        <p>Специализации не найдены</p>
      ) : <div
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
      </div>}
      {!isLoading && !error && specializations.length > 5 && <button
        type="button"
        className={styles.more}
        aria-expanded={isExpanded}
        aria-controls={listId}
        onClick={() => setIsExpanded((current) => !current)}
      >
        {isExpanded ? "Скрыть" : "Посмотреть все"}
      </button>}
    </section>
  );
};
