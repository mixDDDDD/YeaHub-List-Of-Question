import type {
  PublicQuestionsResponse,
  Question,
} from "@/components/questionsPage/data/question";
import { API_BASE_URL } from "./config";

type QuestionFilters = {
  specializationId: number | null;
  skillIds: number[];
  search: string;
  complexity: number[];
  rate: number[];
};

export const getPublicQuestion = async (
  id: number,
  signal?: AbortSignal,
): Promise<Question> => {
  const response = await fetch(
    `${API_BASE_URL}/questions/public-questions/${id}`,
    { signal },
  );

  if (response.status === 404) {
    throw new Error("Вопрос не найден");
  }

  if (!response.ok) {
    throw new Error(`Не удалось загрузить вопрос (${response.status})`);
  }

  return (await response.json()) as Question;
};

export const getPublicQuestions = async (
  page: number,
  limit: number,
  signal?: AbortSignal,
  filters?: QuestionFilters,
): Promise<PublicQuestionsResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    orderBy: "createdAt",
    order: "DESC",
  });

  if (filters?.specializationId != null) {
    searchParams.set("specializationId", String(filters.specializationId));
  }

  if (filters && filters.skillIds.length > 0) {
    searchParams.set("skills", filters.skillIds.join(","));
    searchParams.set("skillFilterMode", "ANY");
  }

  if (filters) {
    if (filters.search.trim()) searchParams.set("titleOrDescription", filters.search.trim());
    if (filters.complexity.length > 0) searchParams.set("complexity", filters.complexity.join(","));
    if (filters.rate.length > 0) searchParams.set("rate", filters.rate.join(","));
  }

  const response = await fetch(
    `${API_BASE_URL}/questions/public-questions?${searchParams}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Не удалось загрузить вопросы (${response.status})`);
  }

  return (await response.json()) as PublicQuestionsResponse;
};
