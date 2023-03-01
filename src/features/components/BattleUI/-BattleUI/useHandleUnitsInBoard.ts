import { useContext, useEffect } from 'react';
import { BattleContext } from '../../../../context/BattleContext';

export const useHandleUnitsInBoard = () => {
  const { setUnitsInBoard, playerArmy, enemyArmy } = useContext(BattleContext);

  useEffect(() => {
    if (enemyArmy != undefined) {
      setUnitsInBoard(
        playerArmy
          .concat(enemyArmy)
          .sort((a, b) => b.initiative.localeCompare(a.initiative))
      );
    }
  }, [enemyArmy, playerArmy]);

  return {};
};
