import { playerUndead } from "../../data/playerInitialStack/undeadStart";
import { playerDryeldar } from "../../data/playerInitialStack/dryeldarStart";
import { Unit } from "../Unit/Unit";
import { useContext } from "react";
import { BattleContext } from "../../context/BattleContext";
import { UnitStats } from "../../types";
import { useUnitPreview } from "../../features/UnitPreview/useUnitPreview";
import { DarkBackgroundWrapper } from "../DarkBackgroundWrapper";
import { UnitPreview } from "../PlayerUI/UnitPreview";

interface Props {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSelection = ({ setIsPlaying }: Props) => {
  const { setPlayerArmy, setPlayerRace } = useContext(BattleContext);
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  const setPlayerInitialArmy = (army: UnitStats[], race: string) => {
    setIsPlaying(true);
    setPlayerArmy(army);
    setPlayerRace(race);
  };

  return (
    <>
      <h1>Hero Selection</h1>
      <div className="heroStack">
        {playerUndead?.map((undead) => (
          <div key={undead.id} onClick={() => handleUnitPreview(undead)}>
            <Unit isInHeroSelection={true} unit={undead} />
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => setPlayerInitialArmy(playerUndead, "undead")}>
        Start as undead
      </button>
      <br /> <br />
      <div className="heroStack">
        {playerDryeldar?.map((dryeldar) => (
          <div key={dryeldar.id} onClick={() => handleUnitPreview(dryeldar)}>
            <Unit isInHeroSelection={true} unit={dryeldar} />
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => setPlayerInitialArmy(playerDryeldar, "dryeldar")}>
        Start as dryeldar
      </button>
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}
    </>
  );
};

export default HeroSelection;
