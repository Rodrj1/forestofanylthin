import { useContext, useEffect } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { UnitStats } from '../../../../types';

interface Props {
  handleUnitPreview: (unit: UnitStats) => void;
  BoardCSS: CSSModuleClasses;
}

export const useBoardDisplay = ({ handleUnitPreview, BoardCSS }: Props) => {
  const { unitsInBoard, setTurn, unitPosition } = useContext(BattleContext);

  const mapUnitsInBoard = unitsInBoard.map((unit) => {
    if (unit) {
      if (unit.belongsTo == 'player') {
        if (unit?.id == unitsInBoard[unitPosition]?.id) {
          return (
            <img
              className={BoardCSS.playing}
              key={unit.id}
              src={unit.face}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        } else
          return (
            <img
              src={unit.face}
              key={unit.id}
              className={BoardCSS.player}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
      } else if (unit.belongsTo == 'enemy') {
        if (unit?.id == unitsInBoard[unitPosition]?.id) {
          return (
            <img
              src={unit.face}
              className={BoardCSS.playing}
              key={unit.id}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        } else {
          return (
            <img
              src={unit.face}
              key={unit.id}
              className={BoardCSS.enemy}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        }
      }
    }
  });

  useEffect(() => {
    if (unitsInBoard != undefined && unitPosition == 0) {
      if (unitsInBoard[0]?.belongsTo == 'player') {
        setTurn('player');
      } else if (unitsInBoard[0]?.belongsTo == 'enemy') {
        setTurn('enemy');
      }
    }
  }, [unitsInBoard]);

  return { mapUnitsInBoard };
};
