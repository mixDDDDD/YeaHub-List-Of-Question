import { useEffect, useState } from "react";
import { getPublicQuestion } from "@/api/questions";
import type { Question } from "@/components/questionsPage/data/question";

export const useQuestion = (questionId: number) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadQuestion = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPublicQuestion(questionId, controller.signal);
        if (!controller.signal.aborted) setQuestion(data);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(
          requestError instanceof TypeError
            ? "Не удалось загрузить вопрос. Проверьте подключение и повторите попытку."
            : requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить вопрос",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadQuestion();
    return () => controller.abort();
  }, [questionId, retryCount]);

  const retry = () => setRetryCount((count) => count + 1);

  return { question, isLoading, error, retry };
};
