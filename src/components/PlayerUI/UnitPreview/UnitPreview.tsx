import { DarkBackgroundWrapper } from "../../DarkBackgroundWrapper";
import { UnitStats } from "../../../types";
import { useSkillPreview } from "../../../features/SkillPreview";
import { SkillPreview } from "../../SkillPreview";
import damage from "../../../assets/images/stats/damage.png";
import armor from "../../../assets/images/stats/armor.png";
import hourglass from "../../../assets/images/stats/hourglass.png";
import health from "../../../assets/images/stats/health.png";
import SkillIcon from "../../SkillPreview/SkillIcon/SkillIcon";
import UnitPreviewCSS from "./style.module.scss";

interface Props {
  previewUnit: UnitStats;
  handleExitUnitPreview: () => void;
}

const UnitPreview = ({ previewUnit, handleExitUnitPreview }: Props) => {
  const { previewSkill, handleSkillPreview, handleExitSkillPreview } =
    useSkillPreview();

  return (
    <div className={UnitPreviewCSS.unitPreview}>
      <img
        src={previewUnit.face}
        alt={previewUnit.id}
        className={UnitPreviewCSS.face}
      />

      <h2>
        {previewUnit.name}
        {previewUnit.type != "Hero" && `- Level ${previewUnit.level}`}
      </h2>

      <div className={UnitPreviewCSS.stats}>
        <div>
          <img src={health} alt="health" />
          <p>Health: {previewUnit.health}</p>
        </div>

        <div>
          <img src={hourglass} alt="initiative" />
          <p>Initiative: {previewUnit.initiative}</p>
        </div>

        <div>
          <img src={damage} alt="attack" />
          <p>Attack: {previewUnit.damage}</p>
        </div>

        <div>
          <img src={armor} alt="armor" />
          <p>Armor: {previewUnit.armor}</p>
        </div>
      </div>

      <div className={UnitPreviewCSS.skillContainer}>
        {previewUnit.skills.map((skill) => (
          <div className={UnitPreviewCSS.skill} key={skill.name}>
            <SkillIcon skill={skill} handleSkillPreview={handleSkillPreview} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>

      {previewSkill != "" && (
        <DarkBackgroundWrapper>
          <SkillPreview
            handleExitSkillPreview={handleExitSkillPreview}
            previewSkill={previewSkill}
          />
        </DarkBackgroundWrapper>
      )}

      <button onClick={handleExitUnitPreview}>CLOSE</button>
    </div>
  );
};
export default UnitPreview;