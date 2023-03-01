import { useContext } from "react";
import { BattleContext } from "../../../context/BattleContext";
import { SkillIcon } from "../../SkillPreview/SkillIcon";
import BattleMessageCSS from "./style.module.scss";

const BattleMessage = () => {
  const {
    playingUnit,
    targetUnit,
    battleMessageText,
    actionImage,
  } = useContext(BattleContext);

  return (
    <>
        <div className={BattleMessageCSS.message}>
          <div className={BattleMessageCSS.playingUnit}>
            <img src={playingUnit?.face} />
          </div>
          <div className={BattleMessageCSS.text}>
            <span>{battleMessageText.toUpperCase()}</span>
            <SkillIcon skill={actionImage} />
          </div>
          <div className={BattleMessageCSS.playingUnit}>
            <img src={targetUnit?.face} />
          </div>
        </div>
    </>
  );
};

export default BattleMessage;
