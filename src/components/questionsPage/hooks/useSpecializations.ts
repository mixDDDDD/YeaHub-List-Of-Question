import { useEffect, useState } from "react";
import { getCatalog } from "@/api/catalog";
import type { QuestionSpecializationOption } from "@/components/questionsPage/data/question";

export const useSpecializations = () => {
  const [specializations, setSpecializations] = useState<QuestionSpecializationOption[]>([]);
  const [isSpecializationsLoading, setIsSpecializationsLoading] = useState(true);
  const [specializationsError, setSpecializationsError] = useState<string | null>(null);
  const [specializationsRetryCount, setSpecializationsRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadSpecializations = async () => {
      setIsSpecializationsLoading(true);
      setSpecializationsError(null);
      try {
        const nextSpecializations =
          await getCatalog<QuestionSpecializationOption>("specializations", new URLSearchParams(), controller.signal);
        if (!controller.signal.aborted) setSpecializations(nextSpecializations);
      } catch {
        if (!controller.signal.aborted)
          setSpecializationsError("Не удалось загрузить специализации");
      } finally {
        if (!controller.signal.aborted) setIsSpecializationsLoading(false);
      }
    };
    void loadSpecializations();
    return () => controller.abort();
  }, [specializationsRetryCount]);

  const retrySpecializations = () => setSpecializationsRetryCount((count) => count + 1);

  return { specializations, isSpecializationsLoading, specializationsError, retrySpecializations };
};
