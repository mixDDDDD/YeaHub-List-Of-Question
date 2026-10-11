import styles from "./questionComplexity.module.css";

const ranges = [
  { label: "1–3", values: [1, 2, 3] },
  { label: "4–6", values: [4, 5, 6] },
  { label: "7–8", values: [7, 8] },
  { label: "9–10", values: [9, 10] },
];

type QuestionComplexityProps = {
  selected: number[];
  onChange: (values: number[]) => void;
};

export const QuestionComplexity = ({ selected, onChange }: QuestionComplexityProps) => {
  return (
    <fieldset className={styles.group}>
      <legend>Уровень сложности</legend>
      <div className={styles.options}>
        {ranges.map((range) => (
          <button
            key={range.label}
            type="button"
            aria-pressed={range.values.every((value) => selected.includes(value))}
            onClick={() => onChange(range.values)}
          >
            {range.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
};
