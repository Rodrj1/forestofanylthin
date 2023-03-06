import { useContext } from 'react';
import { useChangeVisibility } from '../../hooks';
import { UnitStats } from '../../types';
import { BattleContext } from '../../context/BattleContext';
import { useBattle } from '../../features/components/BattleUI';
import { Bar } from '../Bar';
import './style.scss';

interface Props {
  unit: UnitStats;
  isInHeroSelection?: boolean;
}

export const Unit = ({ unit, isInHeroSelection }: Props) => {
  const { isVisible, handleVisibility } = useChangeVisibility();

  const { selectUnit } = useBattle();
  const { action, turn, unitsInBoard, unitPosition, setMagicUsedInTurn } =
    useContext(BattleContext);

  const checkActionRequirement = () => {
    const playingUnit = unitsInBoard[unitPosition];
    switch (action) {
      case 'Dark Magic: Curse':
        if (playingUnit.magic >= 4) {
          setMagicUsedInTurn(4);
          selectUnit(unit);
        }
        break;
      case 'Dark Magic: Weakness':
        if (playingUnit.magic >= 2) {
          selectUnit(unit);
          setMagicUsedInTurn(2);
        }
        break;
      case 'Dark Magic: Shatter Armor':
        if (playingUnit.magic >= 3) {
          selectUnit(unit);
          setMagicUsedInTurn(3);
        }
        break;
      case 'Dark Magic: Breach Resistances':
        if (playingUnit.magic >= 3) {
          selectUnit(unit);
          setMagicUsedInTurn(3);
        }
        break;
      case 'Destruction: Rain of Fire':
        if (playingUnit.magic >= 10) {
          selectUnit(unit);
          setMagicUsedInTurn(10);
        }
        break;
      case 'Destruction: Ice Spear':
        if (playingUnit.magic >= 7) {
          selectUnit(unit);
          setMagicUsedInTurn(7);
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
          setMagicUsedInTurn(6);
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
    <div className='unitContainer'>
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
            <span>
              Damage:{' '}
              {unit.weaknessDamage < 1 ? (
                <span className="affected">
                  {Math.ceil(unit.updatedDamage)}
                </span>
              ) : (
                Math.ceil(unit.updatedDamage)
              )}
            </span>
            <span>
              Armor:{' '}
              {unit.armor < unit.initialArmor ? (
                <span className="affected">{unit.armor.toFixed(1)}</span>
              ) : (
                unit.armor.toFixed(1)
              )}
            </span>
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
      </div>
      <div className="affectedContainer">
        <span>{unit.cursed && 'CURSED: Will miss next attack'}</span>
        <span className="benefical">
          {unit.vampiricHeal && 'VAMPIRIC: Heals with every hit'}
        </span>
        <span>
          {unit.weaknessDamage < 1 &&
            `WEAKENED: Deals ${unit.weaknessDamage.toFixed(1)}% damage`}
        </span>
        <span>
          {unit.armor < unit.initialArmor &&
            `VULNERABLE: Lost ${(unit.initialArmor - unit.armor).toFixed(
              1
            )} armor`}
        </span>
        <span>
          {unit.magicResistance < 0 &&
            `BREACHED: ${
              unit.magicResistance * 10
            }% against magic`}
        </span>
      </div>
    </div>
  );
};
