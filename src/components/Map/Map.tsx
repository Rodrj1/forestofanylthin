import { Army } from '../../types';
import lvlsacre from '../../assets/images/map/sacre.jpg';
import lvlcemetery from '../../assets/images/map/cemetery.jpg';
import lvlgloomyforest from '../../assets/images/map/gloomyforest.jpg';
import lvlLostGlade from '../../assets/images/map/lostglade.jpg';
import {
  cemetery,
  lostGlade,
  forgottenCrypt,
  gloomyForest,
} from '../../data/enemyStacks';
import { DarkBackgroundWrapper } from '../DarkBackgroundWrapper';
import { useState } from 'react';

interface Props {
  handleInFight: (enemiesToAdd: Army, level?: string) => Promise<void>;
  handlePreviewLevel: (enemies: Army) => void;
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
  const [openLevelModal, setOpenLevelModal] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('');
  const [enemiesInLevel, setEnemiesInLevel] = useState<Army>([]);

  const handleAskIfLevel = (level: string) => {
    setOpenLevelModal(true);
    setCurrentLevel(level);

    switch (level) {
      case 'Cemetery':
        setEnemiesInLevel(cemetery);
        break;

      case 'Lost Glade':
        setEnemiesInLevel(lostGlade);
        break;

      case 'Gloomy Forest':
        setEnemiesInLevel(gloomyForest);
        break;

      case 'Sacrelthar':
        setEnemiesInLevel(forgottenCrypt);
        break;
    }
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center min-h-[70vh] items-center">
      {!isCemeteryCompleted && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-red-500">CEMETERY</h2>

          <img
            className="h-[200px] w-[200px] object-cover cursor-pointer border border-zinc-600 p-1 hover:p-0 transition-all"
            src={lvlcemetery}
            onClick={() => handleAskIfLevel('Cemetery')}
          />

          <button
            className="scoutlvl"
            onClick={() => handlePreviewLevel(cemetery)}
          >
            [Scout]
          </button>
        </div>
      )}

      {!isLostGladeCompleted && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-red-500">LOST GLADE</h2>

          <img
            className="h-[200px] w-[200px] object-cover cursor-pointer border border-zinc-600 p-1 hover:p-0 transition-all"
            src={lvlLostGlade}
            onClick={() => handleAskIfLevel('Lost Glade')}
          />

          <button
            className="scoutlvl"
            onClick={() => handlePreviewLevel(lostGlade)}
          >
            [Scout]
          </button>
        </div>
      )}

      {!isGloomyForestCompleted && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-red-500">GLOOMY FOREST</h2>

          <img
            className="h-[200px] w-[200px] object-cover cursor-pointer border border-zinc-600 p-1 hover:p-0 transition-all"
            src={lvlgloomyforest}
            onClick={() => handleAskIfLevel('Gloomy Forest')}
          />

          <button
            className="scoutlvl"
            onClick={() => handlePreviewLevel(gloomyForest)}
          >
            [Scout]
          </button>
        </div>
      )}

      {!isSacreCompleted && (
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-red-500">SACRELTHAR</h2>

          <img
            className="h-[200px] w-[200px] object-cover cursor-pointer border border-zinc-600 p-1 hover:p-0 transition-all"
            src={lvlsacre}
            onClick={() => handleAskIfLevel('Sacrelthar')}
          />

          <button
            className="scoutlvl"
            onClick={() => handlePreviewLevel(forgottenCrypt)}
          >
            [Scout]
          </button>
        </div>
      )}

      {openLevelModal && (
        <DarkBackgroundWrapper>
          <div
            className="flex flex-col h-auto w-[350px] bg-zinc-900/80
     border-[6px] border-double items-center border-violet-900/70 p-2"
          >
            <span className="w-[80%] text-center text-lg">
              Do you wish to enter in
            </span>

            <span className="w-[80%] text-center text-xl text-violet-600">
              {currentLevel}?
            </span>

            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-800/50 border-t-4 border-t-violet-700 px-10"
                onClick={() => handleInFight(enemiesInLevel, currentLevel)}
              >
                Attack
              </button>
              <button
                className="bg-gray-800/50 border-t-4 border-t-violet-700 px-10"
                onClick={() => setOpenLevelModal(false)}
              >
                Leave
              </button>
            </div>
          </div>
        </DarkBackgroundWrapper>
      )}
    </div>
  );
};

export default Map;
