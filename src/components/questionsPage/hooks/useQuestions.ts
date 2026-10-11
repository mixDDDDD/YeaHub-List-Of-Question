import { useEffect, useState } from "react";
import { getPublicQuestions, type QuestionFilters } from "@/api/questions";
import type { Question } from "@/components/questionsPage/data/question";

type UseQuestionsOptions = QuestionFilters & {
  page: number;
  limit: number;
};

export const useQuestions = ({
  page,
  limit,
  specializationId: selectedSpecializationId,
  skillIds: selectedSkillIds,
  search: searchQuery,
  complexity,
  rate: rating,
}: UseQuestionsOptions) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [total, setTotal] = useState(0);

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
  }, [
    page,
    limit,
    retryCount,
    selectedSpecializationId,
    selectedSkillIds,
    searchQuery,
    complexity,
    rating,
  ]);

  const retryQuestions = () => setRetryCount((count) => count + 1);

  return { questions, total, isLoading, error, retryQuestions };
};
