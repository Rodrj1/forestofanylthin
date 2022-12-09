import { UnitStats } from "../../types";
import { useChangeVisibility } from "../../hooks/useVisibility";
import ydris from "../../assets/images/portraits/dryexa/ydris.jpg";
import DialogueBox from "./DialogueBox/DialogueBox";
import PlayerUICSS from "./PlayerUI.module.scss";
import DarkBackgroundWrapper from "../DarkWrapper/DarkWrapper";
import UnitPreview from "./UnitPreview/UnitPreview";
import { useUnitPreview } from "../../features/UnitPreview/useUnitPreview";
import dryexarangerFace from "../../assets/images/portraits/dryexa/dryexarangerface.jpg";
import skeletonFace from "../../assets/images/portraits/undead/skeletonface.jpg";
import { useContext } from "react";
import { BattleContext } from "../../context/BattleContext";

interface Props {
  playerArmy: UnitStats[];
  race: string;
}

const PlayerUI = ({ playerArmy, race }: Props) => {
  const { isVisible, handleVisibility } = useChangeVisibility();
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();
    
  const {
    addedDryexaRanger,
    setAddedDryexaRanger,
    addedSkeletons,
    setAddedSkeletons,
  } = useContext(BattleContext);

  return (
    <div className={PlayerUICSS.container}>
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}

      <div className={PlayerUICSS.faction}>
        <img src={ydris} alt="Yghalris" onClick={handleVisibility} />
      </div>

      <div className={PlayerUICSS.army}>
        {playerArmy.map((unit) => (
          <div className={PlayerUICSS.unit} key={unit.id}>
            <h2>{unit.name}</h2>
            <img
              src={unit.face}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
            <p>{unit.type != "Hero" && Math.ceil(unit.stack)}</p>
          </div>
        ))}
      </div>

      {isVisible && (
        <DarkBackgroundWrapper>
          <div className={PlayerUICSS.dialogue}>
            <DialogueBox
              race={race}
              image={ydris}
              handleVisibility={handleVisibility}
            />
          </div>
        </DarkBackgroundWrapper>
      )}

      {addedDryexaRanger && (
        <DarkBackgroundWrapper>
          <div className={PlayerUICSS.dialogue}>
            <img src={dryexarangerFace} />
            <h3>You gained ten dryexa rangers.</h3>
            <button onClick={() => setAddedDryexaRanger(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}

      {addedSkeletons && (
        <DarkBackgroundWrapper>
          <div className={PlayerUICSS.dialogue}>
            <img src={skeletonFace} />
            <h3>You gained twenty skeletons.</h3>
            <button onClick={() => setAddedSkeletons(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}
    </div>
  );
};

export default PlayerUI;
