import { playerUndead } from '../../data/playerInitialStack/undeadStart';
import { playerDryeldar } from '../../data/playerInitialStack/dryeldarStart';
import { Unit } from '../Unit/Unit';
import { useContext } from 'react';
import { BattleContext } from '../../context/BattleContext';
import { Army } from '../../types';
import { useUnitPreview } from '../../features/UnitPreview/useUnitPreview';
import { DarkBackgroundWrapper } from '../DarkBackgroundWrapper';
import { UnitPreview } from '../PlayerUI/UnitPreview';

interface Props {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSelection = ({ setIsPlaying }: Props) => {
  const { setPlayerArmy, setPlayerRace } = useContext(BattleContext);
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  const setPlayerInitialArmy = (army: Army, race: string) => {
    setIsPlaying(true);
    setPlayerArmy(army);
    setPlayerRace(race);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 py-5 px-1">
      <h1 className="text-2xl mb-10 text-slate-300">Select a faction</h1>

      <div className="flex flex-wrap justify-center gap-10">
        {playerDryeldar?.map((dryeldar) => (
          <div key={dryeldar.id} onClick={() => handleUnitPreview(dryeldar)}>
            <Unit unit={dryeldar} />
          </div>
        ))}
      </div>

      <button onClick={() => setPlayerInitialArmy(playerDryeldar, 'dryeldar')}>
        Dryeldar
      </button>

      <div className="flex flex-wrap justify-center gap-10">
        {playerUndead?.map((undead) => (
          <div key={undead.id} onClick={() => handleUnitPreview(undead)}>
            <Unit unit={undead} />
          </div>
        ))}
      </div>

      <button onClick={() => setPlayerInitialArmy(playerUndead, 'undead')}>
        Undead
      </button>

      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}
    </div>
  );
};

export default HeroSelection;
