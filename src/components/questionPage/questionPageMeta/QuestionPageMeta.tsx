import type { Question } from "@/components/questionsPage/data/question";
import { skillIcons } from "@/components/questionsPage/data/skillIcons";
import styles from "./questionPageMeta.module.css";

type QuestionPageMetaProps = {
  question: Question;
};

export const QuestionPageMeta = ({ question }: QuestionPageMetaProps) => (
  <aside className={styles.meta} aria-label="Информация о вопросе">
    <section className={styles.group}>
      <h2 className={styles.title}>Уровень</h2>
      <dl className={styles.level}>
        <div className={styles.indicator}>
          <dt>Сложность:</dt>
          <dd className={styles.value}>{question.complexity}</dd>
        </div>
        <div className={styles.indicator}>
          <dt>Рейтинг:</dt>
          <dd className={styles.value}>{question.rate}</dd>
        </div>
      </dl>
    </section>
    {question.questionSkills.length > 0 && (
      <section className={styles.group}>
        <h2 className={styles.title}>Навыки</h2>
        <ul className={styles.skills}>
          {question.questionSkills.slice(0, 5).map((skill) => {
            const imageSrc =
              skillIcons[skill.title.trim().toLowerCase()] ?? skill.imageSrc;

            return (
              <li key={skill.id} className={styles.skill}>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt=""
                    width="20"
                    height="20"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                    }}
                  />
                )}
                {skill.title}
              </li>
            );
          })}
        </ul>
      </section>
    )}
    {question.keywords.length > 0 && (
      <section className={styles.group}>
        <h2 className={styles.title}>Ключевые слова</h2>
        <ul className={styles.keywords}>
          {question.keywords.map((keyword, index) => (
            <li key={`${keyword}-${index}`}>#{keyword}</li>
          ))}
        </ul>
      </section>
    )}
  </aside>
);
