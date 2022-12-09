import { UnitStats } from "../../types";
import lvlsacre from "../../assets/images/map/sacre.jpg";
import lvlcemetery from "../../assets/images/map/cemetery.jpg";
import lvlgloomyforest from "../../assets/images/map/gloomyforest.jpg";
import lvlLostGlade from "../../assets/images/map/lostglade.jpg";
import {
  cemetery,
  lostGlade,
  forgottenCrypt,
  gloomyForest,
} from "../../data/enemyStacks";

interface Props {
  handleInFight: (enemiesToAdd: UnitStats[], level?: string) => Promise<void>;
  handlePreviewLevel: (enemies: UnitStats[]) => void;
  removeCemetery: boolean;
  removeGloomyForest: boolean;
  removeLostGlade: boolean;
  removeSacre: boolean;
}

const Map = ({
  handleInFight,
  handlePreviewLevel,
  removeCemetery,
  removeGloomyForest,
  removeLostGlade,
  removeSacre,
}: Props) => {
  return (
    <div className="map">
      <div className="levelsContainer">
        {!removeCemetery && (
          <div className="level">
            <div
              className="levelBtn"
              onClick={() => handleInFight(cemetery, "cemetery")}
            >
              <img src={lvlcemetery} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(cemetery)}
            >
              [Scout Cemetery]
            </button>
          </div>
        )}

        {!removeLostGlade && (
          <div className="level">
            <div
              className="levelBtn"
              onClick={() => handleInFight(lostGlade, "lostGlade")}
            >
              <img src={lvlgloomyforest} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(lostGlade)}
            >
              [Scout Lost Glade]
            </button>
          </div>
        )}

        {!removeGloomyForest && (
          <div className="level">
            <div
              className="levelBtn"
              onClick={() => handleInFight(gloomyForest, "gloomyForest")}
            >
              <img src={lvlLostGlade} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(gloomyForest)}
            >
              [Scout Gloomy Forest]
            </button>
          </div>
        )}

        {!removeSacre && (
          <div className="level">
            <div
              className="levelBtn"
              onClick={() => handleInFight(forgottenCrypt, "sacre")}
            >
              <img src={lvlsacre} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(forgottenCrypt)}
            >
              [Scout Sacre]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
