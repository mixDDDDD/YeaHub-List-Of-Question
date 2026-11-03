import type { QuestionSkill } from "@/components/questionsPage/data/question";
import { skillIcons } from "@/components/questionsPage/data/skillIcons";
import { getCatalog } from "./catalog";

export const getSkills = async (
  specializationId: number | null,
  signal?: AbortSignal,
): Promise<QuestionSkill[]> => {
  const params = new URLSearchParams();
  if (specializationId !== null) params.set("specializations", String(specializationId));
  const data = await getCatalog<QuestionSkill>("skills", params, signal);
  const skills = data
    .map((skill) => ({
      ...skill,
      title: skill.title.trim(),
      imageSrc: skillIcons[skill.title.trim().toLowerCase()] ?? skill.imageSrc,
    }));
  return skills;
};
