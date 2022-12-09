import damage from "../../../assets/images/stats/damage.png";
import armor from "../../../assets/images/stats/armor.png";
import hourglass from "../../../assets/images/stats/hourglass.png";
import health from "../../../assets/images/stats/health.png";
import DarkBackgroundWrapper from "../../DarkWrapper/DarkWrapper";
import { UnitStats } from "../../../types";
import SkillPreview from "../../SkillPreview/SkillPreview";
import { useSkillPreview } from "../../../features/SkillPreview/useSkillPreview";
import SkillIcon from "../../SkillPreview/SkillIcon/SkillIcon";
import UnitPreviewCSS from "./UnitPreview.module.scss";

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

/*

{previewUnit.skills.map((skill) => {
          switch (skill.name) {
            case "Clear":
              break;
            case "Attack":
              return (
                <div className={`${PlayerUICSS.skill} ${PlayerUICSS.combat}`}>
                  <img src={cbattack} alt={skill.name} />
                  <p>Combat: Attack</p>
                </div>
              );
            case "Curse":
              return (
                <div className={`${PlayerUICSS.skill} ${PlayerUICSS.dark}`}>
                  <img
                    src={skill.image}
                    alt={skill.name}
                    onClick={() => handleSkillPreview(curse)}
                  />
                  <p>Dark Magic: Curse</p>
                </div>
              );
            case "Weakness":
              return (
                <div className={`${PlayerUICSS.skill} ${PlayerUICSS.dark}`}>
                  <img src={weakness} alt={skill.name} />
                  <p>Dark Magic: Weakness</p>
                </div>
              );
            case "Shatter Armor":
              return (
                <div className={`${PlayerUICSS.skill} ${PlayerUICSS.dark}`}>
                  <img src={shatterarmor} alt={skill.name} />
                  <p>Dark Magic: Shatter Armor</p>
                </div>
              );
          }
        })}
        */
