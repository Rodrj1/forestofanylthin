import { useContext, useState } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { BattleBoard } from '../BattleBoard';
import { PlayerStack } from '../PlayerStack';
import { EnemyStack } from '../EnemyStack';
import { BattleMessage } from '../BattleMessage';
import { DeadUnit } from '../DeadUnit';
import { useGetPlayingUnit, useHandleUnitsInBoard } from '../../../features/components/BattleUI';
import BattleCSS from './style.module.scss';

const BattleUI = () => {
  const { isInFight, showBattleMessage, deadUnit } = useContext(BattleContext);
  const {} = useGetPlayingUnit();
  const {} = useHandleUnitsInBoard();

  const [playerKey, setPlayerKey] = useState<number>(0);
  const [enemyKey, setEnemyKey] = useState<number>(100);

  return (
    <>
      <div className={BattleCSS.container}>
        <BattleBoard />

        <br />

        {isInFight && (
          <div className={BattleCSS.units}>
            <div className={BattleCSS.playerStack}>
              <PlayerStack
                key={playerKey}
                playerKey={playerKey}
                setPlayerKey={setPlayerKey}
                BattleCSS={BattleCSS}
              />
            </div>
            <div className={BattleCSS.enemyStack}>
              <EnemyStack
                key={enemyKey}
                enemyKey={enemyKey}
                setEnemyKey={setEnemyKey}
                BattleCSS={BattleCSS}
              />
            </div>
          </div>
        )}
      </div>

      {showBattleMessage && (
        <DarkBackgroundWrapper>
          <BattleMessage />
        </DarkBackgroundWrapper>
      )}

      {deadUnit.name != undefined && (
        <DarkBackgroundWrapper>
          <DeadUnit deadUnit={deadUnit} />
        </DarkBackgroundWrapper>
      )}
    </>
  );
};

export default BattleUI;
