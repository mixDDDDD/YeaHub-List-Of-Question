import type { QuestionSkill } from "@/components/questionsPage/data/question";
import styles from "./questionSkills.module.css";
import { useId, useState } from "react";

type QuestionSkillsProps = {
  skills: QuestionSkill[];
  selectedSkillIds: number[];
  onSkillChange: (id: number) => void;
};

export const QuestionSkills = ({
  skills,
  selectedSkillIds,
  onSkillChange,
}: QuestionSkillsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listId = useId();
  const visibleSkills = isExpanded
    ? skills
    : skills.filter((skill, index) => index < 5 || selectedSkillIds.includes(skill.id));

  return (
    <div className={styles.skills}>
      <h3 className={styles.title}>Навыки</h3>
      <div id={listId} className={styles.list}>
        {visibleSkills.map((skill) => (
          <button
            onClick={() => onSkillChange(skill.id)}
            aria-pressed={selectedSkillIds.includes(skill.id)}
            className={styles.skill}
            type="button"
            key={skill.id}
          >
            {skill.imageSrc && (
              <img src={skill.imageSrc} alt="" width="20" height="20" />
            )}
            {skill.title}
          </button>
        ))}
      </div>
      {skills.length > 5 && (
        <button
          type="button"
          className={styles.more}
          aria-expanded={isExpanded}
          aria-controls={listId}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Свернуть" : "Посмотреть все"}
        </button>
      )}
    </div>
  );
};
