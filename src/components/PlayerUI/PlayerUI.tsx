import { Army } from '../../types';
import { useChangeVisibility } from '../../hooks';
import { useUnitPreview } from '../../features/UnitPreview';
import { useContext } from 'react';
import { BattleContext } from '../../context/BattleContext';
import { DarkBackgroundWrapper } from '../DarkBackgroundWrapper';
import { UnitPreview } from './UnitPreview';
import { DialogueBox } from './DialogueBox';
import ydris from '../../assets/images/portraits/dryexa/ydris.jpg';
import dryexarangerFace from '../../assets/images/portraits/dryexa/dryexarangerface.jpg';
import skeletonFace from '../../assets/images/portraits/undead/skeletonface.jpg';
import PlayerUICSS from './css.module.scss';

interface Props {
  playerArmy: Army;
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
        <img src={ydris} alt="Photo of Ydris" onClick={handleVisibility} />
      </div>

      <div className={PlayerUICSS.army}>
        {playerArmy.map((unit) => (
          <div className={PlayerUICSS.unit} key={unit.id}>
            <img
              src={unit.face}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
            {unit.type != 'Hero' && <p>{Math.ceil(unit.stack)}</p>}
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
            <h3>You gained 14 dryexa rangers.</h3>
            <button onClick={() => setAddedDryexaRanger(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}

      {addedSkeletons && (
        <DarkBackgroundWrapper>
          <div className={PlayerUICSS.dialogue}>
            <img src={skeletonFace} />
            <h3>You gained 40 skeletons.</h3>
            <button onClick={() => setAddedSkeletons(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}
    </div>
  );
};

export default PlayerUI;
