import { useContext, useEffect } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { UnitStats } from '../../../../types';

interface Props {
  handleUnitPreview: (unit: UnitStats) => void;
}

export const useBoardDisplay = ({ handleUnitPreview }: Props) => {
  const { unitsInBoard, setTurn, unitPosition } = useContext(BattleContext);

  const portraitStyle =
    ' min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] object-cover cursor-pointer rounded-full';
  const portraitContainer =
    'min-h-[74px] min-w-[74px] max-h-[74px] max-w-[74px] p-[2px] bg-gradient-to-r rounded-full';

  const mapUnitsInBoard = unitsInBoard.map((unit) => {
    const unitIsPlaying = unit?.id == unitsInBoard[unitPosition]?.id;

    if (unit) {
      if (unit.belongsTo == 'player') {
        if (unitIsPlaying) {
          return (
            <div
              key={unit.id}
              className={`${portraitContainer} from-sky-200 to-sky-300`}
            >
              <img
                className={`${portraitStyle}`}
                src={unit.face}
                alt={unit.id}
                onClick={() => handleUnitPreview(unit)}
              />
            </div>
          );
        } else
          return (
            <div
              key={unit.id}
              className={`${portraitContainer} from-green-300 to-green-600`}
            >
              <img
                src={unit.face}
                className={`${portraitStyle}`}
                alt={unit.id}
                onClick={() => handleUnitPreview(unit)}
              />
            </div>
          );
      } else if (unit.belongsTo == 'enemy') {
        if (unitIsPlaying) {
          return (
            <div
              key={unit.id}
              className={`${portraitContainer} from-indigo-400 to-sky-600`}
            >
              <img
                src={unit.face}
                className={`${portraitStyle}`}
                alt={unit.id}
                onClick={() => handleUnitPreview(unit)}
              />{' '}
            </div>
          );
        } else {
          return (
            <div
              key={unit.id}
              className={`${portraitContainer} from-purple-500 to-purple-800`}
            >
              <img
                src={unit.face}
                className={`${portraitStyle}`}
                alt={unit.id}
                onClick={() => handleUnitPreview(unit)}
              />
            </div>
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
