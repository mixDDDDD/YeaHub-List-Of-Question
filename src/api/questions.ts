import type { PublicQuestionsResponse } from "@/components/questionsPage/data/question";

const API_BASE_URL = "https://api.yeatwork.ru";

export const getPublicQuestions = async (
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<PublicQuestionsResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    order: "ASC",
  });

  const response = await fetch(
    `${API_BASE_URL}/questions/public-questions?${searchParams}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Не удалось загрузить вопросы (${response.status})`);
  }

  return (await response.json()) as PublicQuestionsResponse;
};
