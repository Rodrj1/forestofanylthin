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
    <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between px-2 py-5">
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}

      <img
        className="h-[180px] w-[180px] object-cover m-4 p-1 border border-emerald-600 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] cursor-pointer hover:border-purple-700 transition-colors"
        src={ydris}
        alt="Photo of Ydris"
        onClick={handleVisibility}
      />

      <div className="flex flex-wrap gap-2 justify-center items-center relative h-auto px-2">
        {playerArmy.map((unit) => (
          <div className="h-[100px] w-[100px]" key={unit.id}>
            <img
              className="h-[100px] w-[100px] object-cover p-1 border border-zinc-600 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] cursor-pointer hover:border-purple-700 transition-colors"
              src={unit.face}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
            {unit.type != 'Hero' && (
              <span className="absolute top-0 border border-white w-8 h-8 bg-purple-700 text-center p-1 m-1">
                {Math.ceil(unit.stack)}
              </span>
            )}
          </div>
        ))}
      </div>

      {isVisible && (
        <DarkBackgroundWrapper>
          <DialogueBox
            race={race}
            image={ydris}
            handleVisibility={handleVisibility}
          />
        </DarkBackgroundWrapper>
      )}

      {addedDryexaRanger && (
        <DarkBackgroundWrapper>
          <div className="flex flex-col p-3 w-[95%] sm:w-[350px] gap-2 items-center justify-center bg-zinc-900/80 border-[6px] border-double border-violet-900/70">
            <img
              className="object-cover h-[140px] w-[140px] rounded-full border border-zinc-600 p-1"
              src={dryexarangerFace}
            />
            <h3>You gained 14 dryexa rangers.</h3>
            <button onClick={() => setAddedDryexaRanger(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}

      {addedSkeletons && (
        <DarkBackgroundWrapper>
          <div className="flex flex-col p-3 w-[95%] sm:w-[350px] gap-2 items-center justify-center bg-zinc-900/80 border-[6px] border-double border-violet-900/70">
            <img
              className="object-cover h-[140px] w-[140px] rounded-full border border-zinc-600 p-1"
              src={skeletonFace}
            />
            <h3>You gained 40 skeletons.</h3>
            <button onClick={() => setAddedSkeletons(false)}>CLOSE</button>
          </div>
        </DarkBackgroundWrapper>
      )}
    </div>
  );
};

export default PlayerUI;
