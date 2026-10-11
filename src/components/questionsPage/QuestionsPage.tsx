import { useEffect, useState } from "react";
import { getPublicQuestions } from "@/api/questions";
import { QuestionsList } from "./questionsList/QuestionsList";
import { QuestionsPanel } from "./questionsPanel/QuestionsPanel";
import styles from "./questionsPage.module.css";
import type { Question, QuestionSkill } from "./data/question";
import { frontendSkills } from "./data/skills";
import { specializations } from "./data/specializations";
import { getSkills } from "@/api/skills";

export const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<number | null>(null);
  const [skills, setSkills] = useState<QuestionSkill[]>(frontendSkills);
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsRetryCount, setSkillsRetryCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [complexity, setComplexity] = useState<number[]>([]);
  const [rating, setRating] = useState<number[]>([]);

  useEffect(() => {
    if (searchInput.trim() === searchQuery) return;
    const timer = window.setTimeout(() => {
      setSearchQuery(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput, searchQuery]);

  const handleComplexityChange = (values: number[]) => {
    setComplexity((current) => values.every((value) => current.includes(value))
      ? current.filter((value) => !values.includes(value))
      : [...current, ...values]);
    setPage(1);
  };

  const handleRatingChange = (value: number) => {
    setRating((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
    setPage(1);
  };


  const handleSpecializationChange = (id: number) => {
    setSelectedSpecializationId((currentId) => currentId === id ? null : id);
    setSelectedSkillIds([]);
    setPage(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadSkills = async () => {
      setIsSkillsLoading(true);
      setSkillsError(null);
      try {
        const nextSkills = selectedSpecializationId === null
          ? frontendSkills
          : await getSkills(selectedSpecializationId, controller.signal);
        if (!controller.signal.aborted) setSkills(nextSkills);
      } catch {
        if (!controller.signal.aborted) setSkillsError("Не удалось загрузить навыки");
      } finally {
        if (!controller.signal.aborted) setIsSkillsLoading(false);
      }
    };
    void loadSkills();
    return () => controller.abort();
  }, [selectedSpecializationId, skillsRetryCount]);

  const handleSkillChange = (id: number) => {
    setPage(1);
    setSelectedSkillIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((skillId) => skillId !== id)
        : [...currentIds, id],
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getPublicQuestions(
          page,
          limit,
          controller.signal,
          {
            specializationId: selectedSpecializationId,
            skillIds: selectedSkillIds,
            search: searchQuery,
            complexity,
            rate: rating,
          },
        );
        if (controller.signal.aborted) return;
        setQuestions(response.data);
        setTotal(response.total ?? 0);
      } catch (requestError) {
        if (controller.signal.aborted) return;

        setError(
          requestError instanceof TypeError
            ? "Не удалось загрузить вопросы. Проверьте подключение и повторите попытку."
            : requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить вопросы",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadQuestions();

    return () => controller.abort();
  }, [page, retryCount, selectedSpecializationId, selectedSkillIds, searchQuery, complexity, rating]);

  const totalPages = Math.ceil(total / limit);
  const selectedSpecialization = specializations.find((item) => item.id === selectedSpecializationId);
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
        onRetry={() => setRetryCount((count) => count + 1)}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
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
        onSkillsRetry={() => setSkillsRetryCount((count) => count + 1)}
        selectedSkillIds={selectedSkillIds}
        onSkillChange={handleSkillChange}
      />
    </main>
  );
};
