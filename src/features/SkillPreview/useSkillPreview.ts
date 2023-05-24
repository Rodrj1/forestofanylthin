import { useState } from "react";
import { Skill } from "../../types";

export const useSkillPreview = () => {
  const [previewSkill, setPreviewSkill] = useState<Skill | "">("");

  const handleSkillPreview = (skill: Skill) => {
    setPreviewSkill(skill);
  };

  const handleExitSkillPreview = () => {
    setPreviewSkill("");
  };

  return {
    previewSkill,
    handleSkillPreview,
    handleExitSkillPreview,
  };
};
