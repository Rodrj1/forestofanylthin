import { useContext, useEffect, useState } from "react";
import { BattleContext } from "../../../context/BattleContext";
import { Unit } from "../../Unit/Unit";
import { useActionSound } from "../../../hooks/useSound";
import { useSkillPreview } from "../../../features/SkillPreview/useSkillPreview";
import DarkBackgroundWrapper from "../../DarkWrapper/DarkWrapper";
import SkillPreview from "../../SkillPreview/SkillPreview";
import SkillIcon from "../../SkillPreview/SkillIcon/SkillIcon";

interface Props {
  playerKey: number;
  setPlayerKey: React.Dispatch<React.SetStateAction<number>>;
  BattleCSS: CSSModuleClasses;
}

const PlayerStack = ({ playerKey, setPlayerKey, BattleCSS }: Props) => {
  const { previewSkill, handleSkillPreview, handleExitSkillPreview } =
    useSkillPreview();

  const { setAction, unitsInBoard, enemyArmy, playerArmy, unitPosition } =
    useContext(BattleContext);

  const { playPreviewSound } = useActionSound();

  const [storeArmy, setStoreArmy] = useState(playerArmy);
  const [storeKey, setStoreKey] = useState(playerKey);
  const [actionImage, setActionImage] = useState<string>();

  const handleAction = (playerAction: string, skillImage: string) => {
    setActionImage(skillImage);
    playPreviewSound();
    if (playerAction != "Combat: Clear Action") {
      if (unitsInBoard[unitPosition].belongsTo == "player")
        setAction(playerAction);
    } else setAction("");
  };

  useEffect(() => {
    setStoreArmy([...playerArmy]);
    setStoreKey((n) => n + 1);
    setPlayerKey(storeKey);
  }, [playerArmy]);

  useEffect(() => {
    setActionImage("");
  }, [playerArmy, enemyArmy]);

  const showArmy = storeArmy.map((unit) => <Unit unit={unit} key={unit.id} />);

  return (
    <>
      <div className={BattleCSS.tempered}>{showArmy}</div>

      <div className={BattleCSS.playerSkills}>
        {actionImage != "" && (
          <div className={BattleCSS.action}>
            <h3>Action:</h3>
            <img src={actionImage} />
          </div>
        )}

        {unitsInBoard[unitPosition]?.skills.map((skill) => (
            <div className={BattleCSS.skill} key={skill.name}>
              <SkillIcon
                skill={skill}
                handleSkillPreview={handleSkillPreview}
              />
              <button
                key={skill.name}
                onClick={() => handleAction(skill.name, skill.image)}
              >
                {skill.formattedName}
              </button>
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
    </>
  );
};

export default PlayerStack;
