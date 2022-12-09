import { useContext } from "react";
import { BattleContext } from "./context/BattleContext";
import { useBattleHandler } from "./features/App/useBattleHandler";
import { useZonePreview } from "./features/App/useZonePreview";
import DarkWrapper from "./components/DarkWrapper/DarkWrapper";
import BattleUI from "./components/BattleUI/BattleUI";
import HeroSelection from "./components/HeroSelection/HeroSelection";
import ZonePreview from "./components/ZonePreview/ZonePreview";
import PlayerUI from "./components/PlayerUI/PlayerUI";
import Map from "./components/Map/Map";
import WinOrDefeat from "./components/WinOrDefeat/WinOrDefeat";
import "./App.scss";

function App() {
  const { playerRace, isInFight, playerArmy } = useContext(BattleContext);

  const {
    removeCemetery,
    removeGloomyForest,
    removeLostGlade,
    removeSacre,
    handleInFight,
    levelsCompleted,
    isPlaying,
    setIsPlaying,
  } = useBattleHandler();

  const { previewLevelInfo, isVisible, handleVisibility, handlePreviewLevel } =
    useZonePreview();

  return (
    <div className="App">
      {playerArmy.length < 1 && !isPlaying && (
        <div className="heroSelection">
          <HeroSelection setIsPlaying={setIsPlaying} />
        </div>
      )}

      {playerArmy.length == 0 && isPlaying && (
        <DarkWrapper opacity={1}>
          <WinOrDefeat text={"YOU HAVE LOST!"} />
        </DarkWrapper>
      )}

      {levelsCompleted == 4 && (
        <DarkWrapper opacity={1}>
          <WinOrDefeat text={"YOU HAVE WON!"} />
        </DarkWrapper>
      )}

      {isVisible && previewLevelInfo && (
        <ZonePreview
          handleVisibility={handleVisibility}
          previewLevel={previewLevelInfo}
        />
      )}

      {!isInFight && playerRace != "" && playerArmy.length > 0 && (
        <PlayerUI race={playerRace} playerArmy={playerArmy} />
      )}

      {!isInFight && playerArmy.length > 0 && (
        <Map
          removeCemetery={removeCemetery}
          removeGloomyForest={removeGloomyForest}
          removeLostGlade={removeLostGlade}
          removeSacre={removeSacre}
          handleInFight={handleInFight}
          handlePreviewLevel={handlePreviewLevel}
        />
      )}

      {isInFight && <BattleUI />}
    </div>
  );
}

export default App;
