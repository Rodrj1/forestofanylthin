import { skill } from "../../types";
import SkillIcon from "./SkillIcon/SkillIcon";
import SkillPreviewCSS from "./SkillPreview.module.scss";

interface Props {
  previewSkill: skill;
  handleExitSkillPreview: () => void;
}

const SkillPreview = ({ previewSkill, handleExitSkillPreview }: Props) => {

  return (
    <div className={SkillPreviewCSS.skillPreview}>
      <SkillIcon skill={previewSkill} />
      <h3>{previewSkill.name}</h3>
      <p className={SkillPreviewCSS.skillDesc}>{previewSkill.description}</p>
      <button onClick={handleExitSkillPreview}>CLOSE</button>
    </div>
  );
};

export default SkillPreview;
