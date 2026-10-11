import type { QuestionSkill } from "@/components/questionsPage/data/question";
import { QuestionSkills } from "@/components/questionsPage/questionsPanel/questionSkills/QuestionSkills";
import { QuestionSpecializations } from "./questionSpecializations/QuestionSpecializations";
import styles from "./questionsPanel.module.css";
import { QuestionSearch } from "./questionSearch/QuestionSearch";
import { QuestionComplexity } from "./questionComplexity/QuestionComplexity";
import { QuestionRating } from "./questionRating/QuestionRating";

type QuestionsPanelProps = {
  search: string;
  onSearchChange: (value: string) => void;
  complexity: number[];
  onComplexityChange: (values: number[]) => void;
  rating: number[];
  onRatingChange: (value: number) => void;
  selectedSpecializationId: number | null;
  onSpecializationChange: (id: number) => void;
  skills: QuestionSkill[];
  isSkillsLoading: boolean;
  skillsError: string | null;
  onSkillsRetry: () => void;
  selectedSkillIds: number[];
  onSkillChange: (id: number) => void;
};

export const QuestionsPanel = ({
  search,
  onSearchChange,
  complexity,
  onComplexityChange,
  rating,
  onRatingChange,
  selectedSpecializationId,
  onSpecializationChange,
  skills,
  isSkillsLoading,
  skillsError,
  onSkillsRetry,
  selectedSkillIds,
  onSkillChange,
}: QuestionsPanelProps) => {
  return (
    <aside className={styles.panel} aria-label="Фильтры вопросов">
      <QuestionSearch value={search} onChange={onSearchChange} />
      <QuestionSpecializations
        selectedSpecializationId={selectedSpecializationId}
        onSpecializationChange={onSpecializationChange}
      />
      {isSkillsLoading ? (
        <p role="status">Загружаем навыки…</p>
      ) : skillsError ? (
        <div role="alert">
          <p>{skillsError}</p>
          <button type="button" onClick={onSkillsRetry}>
            Повторить
          </button>
        </div>
      ) : (
        <QuestionSkills
          selectedSkillIds={selectedSkillIds}
          onSkillChange={onSkillChange}
          skills={skills}
        />
      )}
      <QuestionComplexity selected={complexity} onChange={onComplexityChange} />
      <QuestionRating selected={rating} onChange={onRatingChange} />
    </aside>
  );
};
