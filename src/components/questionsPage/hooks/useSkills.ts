import { useEffect, useState } from "react";
import { getSkills } from "@/api/skills";
import type { QuestionSkill } from "@/components/questionsPage/data/question";
import { frontendSkills } from "@/components/questionsPage/data/skills";

export const useSkills = (selectedSpecializationId: number | null) => {
  const [skills, setSkills] = useState<QuestionSkill[]>(frontendSkills);
  const [isSkillsLoading, setIsSkillsLoading] = useState(false);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsRetryCount, setSkillsRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadSkills = async () => {
      setIsSkillsLoading(true);
      setSkillsError(null);
      try {
        const nextSkills =
          selectedSpecializationId === null
            ? frontendSkills
            : await getSkills(selectedSpecializationId, controller.signal);
        if (!controller.signal.aborted) setSkills(nextSkills);
      } catch {
        if (!controller.signal.aborted)
          setSkillsError("Не удалось загрузить навыки");
      } finally {
        if (!controller.signal.aborted) setIsSkillsLoading(false);
      }
    };
    void loadSkills();
    return () => controller.abort();
  }, [selectedSpecializationId, skillsRetryCount]);

  const retrySkills = () => setSkillsRetryCount((count) => count + 1);

  return { skills, isSkillsLoading, skillsError, retrySkills };
};
