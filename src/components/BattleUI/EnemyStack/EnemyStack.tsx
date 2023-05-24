import { useContext } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { useArmyUpdater } from '../../../hooks/useArmyUpdater';

interface Props {
  enemyKey: number;
  setEnemyKey: React.Dispatch<React.SetStateAction<number>>;
}

const EnemyStack = ({ enemyKey, setEnemyKey }: Props) => {
  const { enemyArmy } = useContext(BattleContext);

  const { showArmy } = useArmyUpdater({
    army: enemyArmy,
    key: enemyKey,
    setKey: setEnemyKey,
  });

  return <div className="flex gap-1 overflow-auto w-full overflow-x-auto overflow-y-hidden justify-start md:justify-center">{showArmy}</div>;
};

export default EnemyStack;
