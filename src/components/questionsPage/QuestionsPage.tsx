import { useEffect, useId, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useKeyDown } from "@/hooks/useKeyDown";
import { useQuestions } from "./hooks/useQuestions";
import { QuestionsList } from "./questionsList/QuestionsList";
import { QuestionsPanel } from "./questionsPanel/QuestionsPanel";
import styles from "./questionsPage.module.css";
import { specializations } from "./data/specializations";
import { useSkills } from "./hooks/useSkills";

export const QuestionsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<
    number | null
  >(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [complexity, setComplexity] = useState<number[]>([]);
  const [rating, setRating] = useState<number[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { questions, total, isLoading, error, retryQuestions } = useQuestions({
    page,
    limit,
    specializationId: selectedSpecializationId,
    skillIds: selectedSkillIds,
    search: searchQuery,
    complexity,
    rate: rating,
  });
  const { skills, isSkillsLoading, skillsError, retrySkills } = useSkills(selectedSpecializationId);

  const filtersId = useId();
  const filtersRef = useRef<HTMLDivElement>(null);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside<HTMLElement>([filtersRef, filtersButtonRef], () => setIsFiltersOpen(false), isFiltersOpen);
  useKeyDown("Escape", (event) => {
    event.preventDefault();
    setIsFiltersOpen(false);
    filtersButtonRef.current?.focus();
  }, isFiltersOpen);

  useEffect(() => {
    if (searchInput.trim() === searchQuery) return;
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput, searchQuery]);

  const handleComplexityChange = (values: number[]) => {
    setComplexity((current) =>
      values.every((value) => current.includes(value))
        ? current.filter((value) => !values.includes(value))
        : [...current, ...values],
    );
    setPage(1);
  };

  const handleRatingChange = (value: number) => {
    setRating((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
    setPage(1);
  };

  const handleSpecializationChange = (id: number) => {
    setSelectedSpecializationId((currentId) => (currentId === id ? null : id));
    setSelectedSkillIds([]);
    setPage(1);
  };

  const handleSkillChange = (id: number) => {
    setPage(1);
    setSelectedSkillIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((skillId) => skillId !== id)
        : [...currentIds, id],
    );
  };

  const totalPages = Math.ceil(total / limit);
  const selectedSpecialization = specializations.find(
    (item) => item.id === selectedSpecializationId,
  );
  const title = selectedSpecialization
    ? `Вопросы ${selectedSpecialization.title}`
    : "Вопросы";

  return (
    <main id="questions" className={styles["questions-page"]}>
      <QuestionsList
        title={title}
        questions={questions}
        isLoading={isLoading}
        error={error}
        onRetry={retryQuestions}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isFiltersOpen={isFiltersOpen}
        filtersId={filtersId}
        filtersButtonRef={filtersButtonRef}
        onFiltersToggle={() => setIsFiltersOpen((current) => !current)}
      />
      <div
        id={filtersId}
        ref={filtersRef}
        className={`${styles["questions-page__filters"]} ${isFiltersOpen ? styles["questions-page__filters--open"] : ""}`}
      >
        <QuestionsPanel
          search={searchInput}
          onSearchChange={setSearchInput}
          complexity={complexity}
          onComplexityChange={handleComplexityChange}
          rating={rating}
          onRatingChange={handleRatingChange}
          selectedSpecializationId={selectedSpecializationId}
          onSpecializationChange={handleSpecializationChange}
          skills={skills}
          isSkillsLoading={isSkillsLoading}
          skillsError={skillsError}
          onSkillsRetry={retrySkills}
          selectedSkillIds={selectedSkillIds}
          onSkillChange={handleSkillChange}
        />
      </div>
    </main>
  );
};
