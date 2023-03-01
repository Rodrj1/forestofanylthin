import { useEffect, useState } from "react";
import { useActionSound } from "../../../hooks";
import { skill } from "../../../types";
import SkillIconCSS from "./style.module.scss";

interface Props {
  skill: skill;
  handleSkillPreview?: (skill: skill) => void;
}

const SkillIcon = ({ skill, handleSkillPreview }: Props) => {
  const [skillType, setSkillType] = useState(``);
  const { playPreviewSound } = useActionSound();

  useEffect(() => {
    switch (skill.type) {
      case "Dark Magic":
        setSkillType(`${SkillIconCSS.darkMagic}`);
        break;
      case "Combat":
        setSkillType(`${SkillIconCSS.combat}`);
        break;
      case "Destruction":
        setSkillType(`${SkillIconCSS.destruction}`);
        break;
      case "Necromancy":
        setSkillType(`${SkillIconCSS.necromancy}`);
        break;
    }
  }, []);

  const fireSkillPreviewHandler = () => {
    if (handleSkillPreview) {
      playPreviewSound();
      handleSkillPreview(skill);
    }
  };

  return (
    <>
      <img
        src={skill.image}
        alt={skill.name}
        onClick={fireSkillPreviewHandler}
        className={skillType}
      />
    </>
  );
};

export default SkillIcon;
