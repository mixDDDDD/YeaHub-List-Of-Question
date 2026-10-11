import type { QuestionSkill } from "@/components/questionsPage/data/question";
import { skillIcons } from "@/components/questionsPage/data/skillIcons";
import { frontendSkills } from "@/components/questionsPage/data/skills";
import { API_BASE_URL } from "./config";

export const getSkills = async (
  specializationId: number,
  signal?: AbortSignal,
): Promise<QuestionSkill[]> => {
  const params = new URLSearchParams({
    limit: "100",
    specializations: String(specializationId),
  });
  const response = await fetch(`${API_BASE_URL}/skills?${params}`, { signal });
  if (!response.ok) throw new Error("Не удалось загрузить навыки");
  const result = (await response.json()) as { data: QuestionSkill[] };
  const skills = result.data
    .map((skill) => ({
      ...skill,
      title: skill.title.trim(),
      imageSrc: skillIcons[skill.title.trim().toLowerCase()] ?? skill.imageSrc,
    }));
  if (specializationId === 11) {
    const order = frontendSkills.map((skill) => skill.id);
    skills.sort((left, right) => {
      const leftIndex = order.indexOf(left.id);
      const rightIndex = order.indexOf(right.id);
      return (
        (leftIndex < 0 ? order.length : leftIndex) -
        (rightIndex < 0 ? order.length : rightIndex)
      );
    });
  }
  return skills;
};
