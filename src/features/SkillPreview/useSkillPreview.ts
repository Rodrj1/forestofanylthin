import { useState } from "react";
import { skill } from "../../types";

export const useSkillPreview = () => {
  const [previewSkill, setPreviewSkill] = useState<skill | "">("");

  const handleSkillPreview = (skill: skill) => {
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
