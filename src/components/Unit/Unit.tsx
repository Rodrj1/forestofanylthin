import { useContext } from 'react';
import { useChangeVisibility } from '../../hooks';
import { UnitStats } from '../../types';
import { BattleContext } from '../../context/BattleContext';
import { useBattle } from '../../features/components/BattleUI';
import Bar from '../Bar/Bar';
import './style.scss';

interface Props {
  unit: UnitStats;
  isInHeroSelection?: boolean;
}

export const Unit = ({ unit, isInHeroSelection }: Props) => {
  const { isVisible, handleVisibility } = useChangeVisibility();

  const { selectUnit } = useBattle();
  const { action, turn, unitsInBoard, unitPosition } =
    useContext(BattleContext);

  const checkActionRequirement = () => {
    switch (action) {
      case 'Dark Magic: Curse':
        if (unitsInBoard[unitPosition].magic >= 4) {
          selectUnit(unit);
        }
        break;
      case 'Dark Magic: Weakness':
        if (unitsInBoard[unitPosition].magic >= 2) {
          selectUnit(unit);
        }
        break;
      case 'Dark Magic: Shatter Armor':
        if (unitsInBoard[unitPosition].magic >= 3) {
          selectUnit(unit);
        }
        break;
      case 'Destruction: Rain of Fire':
        if (unitsInBoard[unitPosition].magic >= 10) {
          selectUnit(unit);
        }
        break;
      default:
        selectUnit(unit);
        break;
    }
  };

  const handleSelectUnit = () => {
    if (turn == 'player' && unit.belongsTo == 'player') {
      if (
        action == 'Necromancy: Reanimate' ||
        action == 'Necromancy: Vampiric Lust'
      )
        if (unitsInBoard[unitPosition].magic >= 6) {
          selectUnit(unit);
        }
    }
    if (
      action != '' &&
      action != 'Necromancy: Reanimate' &&
      action != 'Necromancy: Vampiric Lust' &&
      turn == 'player' &&
      unit.belongsTo == 'enemy'
    ) {
      checkActionRequirement();
    } else if (isInHeroSelection == undefined && action == '') {
      handleVisibility();
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="unitCard" onClick={handleSelectUnit}>
        <img src={unit.portrait} />
        {isVisible && (
          <div className="stats">
            <span>{unit.name}</span>
            <span>
              Health:{' '}
              {(Math.round(Math.ceil(unit.updatedHealth) * 10) / 10).toFixed(1)}
            </span>
            <span>Magic: {unit.magic}</span>
            <span>Damage: {Math.ceil(unit.updatedDamage)}</span>
            <span>Armor: {unit.armor.toFixed(1)}</span>
            <span>Initiative: {unit.initiative}</span>
            <span>Spiritual power: {unit.magic}</span>
          </div>
        )}
        {unit.type != 'Hero' && !isVisible && (
          <span className="stack">{Math.ceil(unit.stack)}</span>
        )}
      </div>
      <div className="unitBars">
        <Bar
          value={unit.updatedHealth}
          maxValue={unit.health * unit.maxStack}
          type="health"
          race={unit.type}
        />
        <Bar
          value={unit.magic}
          maxValue={unit.maxMagic}
          type="mana"
          race={unit.type}
        />

        <div className="affected">
          <span>{unit.cursed && 'CURSED: Will miss next attack'}</span>
          <span className="benefical">
            {unit.vampiricHeal && 'VAMPIRIC: This unit heals with every hit'}
          </span>
          <span>
            {unit.weaknessDamage < 1 &&
              `WEAKENED: Deals ${(1 - unit.weaknessDamage).toFixed(
                1
              )}% damage`}
          </span>
          <span>
            {unit.armor < unit.initialArmor &&
              `VULNERABLE: Lost ${(unit.initialArmor - unit.armor).toFixed(
                1
              )} of its armor`}
          </span>
        </div>
      </div>
    </div>
  );
};
