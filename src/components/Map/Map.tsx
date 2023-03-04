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
  isCemeteryCompleted: boolean;
  isGloomyForestCompleted: boolean;
  isLostGladeCompleted: boolean;
  isSacreCompleted: boolean;
}

const Map = ({
  handleInFight,
  handlePreviewLevel,
  isCemeteryCompleted,
  isGloomyForestCompleted,
  isLostGladeCompleted,
  isSacreCompleted,
}: Props) => {

  return (
    <div className="map">
      <div className="levelsContainer">
        {!isCemeteryCompleted && (
          <div className="level">
            <h5>CEMETERY</h5>
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

        {!isLostGladeCompleted && (
          <div className="level">
            <h5>LOST GLADE</h5>
            <div
              className="levelBtn"
              onClick={() => handleInFight(lostGlade, "lostGlade")}
            >
              <img src={lvlLostGlade} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(lostGlade)}
            >
              [Scout Lost Glade]
            </button>
          </div>
        )}

        {!isGloomyForestCompleted && (
          <div className="level">
            <h5>GLOOMY FOREST</h5>
            <div
              className="levelBtn"
              onClick={() => handleInFight(gloomyForest, "gloomyForest")}
            >
              <img src={lvlgloomyforest} />
            </div>
            <button
              className="scoutlvl"
              onClick={() => handlePreviewLevel(gloomyForest)}
            >
              [Scout Gloomy Forest]
            </button>
          </div>
        )}

        {!isSacreCompleted && (
          <div className="level">
            <h5>SACRELTHAR</h5>
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
              [Scout Sacrelthar]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
