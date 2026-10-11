import styles from "./questionRating.module.css";

type QuestionRatingProps = { selected: number[]; onChange: (value: number) => void };

export const QuestionRating = ({ selected, onChange }: QuestionRatingProps) => {
  return (
    <fieldset className={styles.group}>
      <legend>Рейтинг</legend>
      <div className={styles.options}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={selected.includes(value)}
            onClick={() => onChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </fieldset>
  );
};
