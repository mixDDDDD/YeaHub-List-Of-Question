import { useId } from "react";
import searchIcon from "@/assets/icons/search/search.svg";
import styles from "./questionSearch.module.css";

type QuestionSearchProps = { value: string; onChange: (value: string) => void };

export const QuestionSearch = ({ value, onChange }: QuestionSearchProps) => {
  const id = useId();
  return (
    <div className={styles.search}>
      <label htmlFor={id} className={styles.label}>
        Поиск вопросов
      </label>
      <div className={styles.field}>
        <img className={styles.icon} src={searchIcon} alt="" aria-hidden="true" />
        <input
          id={id}
          type="search"
          placeholder="Введите запрос…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
};
