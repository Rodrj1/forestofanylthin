import { useContext } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { useArmyUpdater } from '../../../hooks/useArmyUpdater';

interface Props {
  enemyKey: number;
  setEnemyKey: React.Dispatch<React.SetStateAction<number>>;
  BattleCSS: CSSModuleClasses;
}

const EnemyStack = ({ enemyKey, setEnemyKey, BattleCSS }: Props) => {
  const { enemyArmy } = useContext(BattleContext);

  const { showArmy } = useArmyUpdater({
    army: enemyArmy,
    key: enemyKey,
    setKey: setEnemyKey,
  });

  return <div className={BattleCSS.army}>{showArmy}</div>;
};

export default EnemyStack;
