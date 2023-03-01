import { useContext, useEffect } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { useBattle } from './useBattle';

export const useGetPlayingUnit = () => {
  const { unitsInBoard, unitPosition, playerArmy, turn } =
    useContext(BattleContext);

  const { selectUnit } = useBattle();

  useEffect(() => {
    const playingUnit = unitsInBoard[unitPosition];
    const getUnitOwnership = playingUnit?.belongsTo.split(' ');
    const unitIsEnemy = getUnitOwnership?.includes('enemy');

    if (unitIsEnemy) {
      const AIAttacksPosition = Math.floor(Math.random() * playerArmy.length);

      const targetUnitInPlayerArmy = playerArmy.find(
        (unit) => unit.id == playerArmy[AIAttacksPosition].id
      );

      if (targetUnitInPlayerArmy != undefined) {
        selectUnit(targetUnitInPlayerArmy);
      }
    }
  }, [turn]);

  return {};
};
