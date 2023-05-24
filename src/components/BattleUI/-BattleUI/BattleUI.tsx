import { useContext, useState } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { BattleBoard } from '../BattleBoard';
import { PlayerStack } from '../PlayerStack';
import { EnemyStack } from '../EnemyStack';
import { BattleMessage } from '../BattleMessage';
import { DeadUnit } from '../DeadUnit';
import {
  useGetPlayingUnit,
  useHandleUnitsInBoard,
} from '../../../features/components/BattleUI';

const BattleUI = () => {
  const { isInFight, showBattleMessage, deadUnit } = useContext(BattleContext);
  const {} = useGetPlayingUnit();
  const {} = useHandleUnitsInBoard();

  const [playerKey, setPlayerKey] = useState<number>(0);
  const [enemyKey, setEnemyKey] = useState<number>(100);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 min-h-screen m-auto">
        <BattleBoard />

        {isInFight && (
          <PlayerStack
            key={playerKey}
            playerKey={playerKey}
            setPlayerKey={setPlayerKey}
          />
        )}

        {isInFight && (
          <EnemyStack
            key={enemyKey}
            enemyKey={enemyKey}
            setEnemyKey={setEnemyKey}
          />
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
