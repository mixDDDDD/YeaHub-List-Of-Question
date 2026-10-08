export type QuestionSpecialization = {
  id: number;
  title: string;
  slug: string;
};

export type QuestionSkill = {
  id: number;
  title: string;
};

export type QuestionTopic = {
  id: number;
  title: string;
};

export type Question = {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  questionSpecializations: QuestionSpecialization[];
  questionSkills: QuestionSkill[];
  questionTopics: QuestionTopic[];
};

export type PublicQuestionsResponse = {
  data: Question[];
  total?: number;
  page?: number;
  limit?: number;
};
