import { useContext, useState } from 'react';
import { UnitStats } from '../../types';
import { BattleContext } from '../../context/BattleContext';
import { useBattle } from '../../features/components/BattleUI';
import { Bar } from '../Bar';

interface Props {
  unit: UnitStats;
  isInHeroSelection?: boolean;
}

export const Unit = ({ unit, isInHeroSelection }: Props) => {
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
    }
  };

  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <article className="min-w-[200px]">
      <div
        className="h-[220px] w-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] relative"
        onClick={handleSelectUnit}
        onMouseEnter={() => setHoverEffect(true)}
        onMouseLeave={() => setHoverEffect(false)}
      >
        <img
          className={`object-cover h-full w-full object-top border border-zinc-700 p-1 cursor-pointer rounded-full`}
          src={unit.portrait}
        />

        {unit.type != 'Hero' && (
          <span className="absolute top-0 border border-white w-8 h-8 bg-purple-700 text-center p-1 m-1">
            {Math.ceil(unit.stack)}
          </span>
        )}

        <div
          className={`absolute h-[100%] w-full pointer-events-none transition-opacity bg-gradient-to-t from-purple-700 from-1% to-transparent to-90% rounded-full top-0
        ${hoverEffect === true ? 'opacity-100' : 'opacity-0'}
        `}
        ></div>
      </div>

      <div className="flex flex-col gap-1 mt-1">
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

      <div className="flex flex-col text-sm w-full">
        <span className="text-red-600">
          {unit.cursed && 'CURSED: Will miss next attack'}
        </span>

        <span className="text-green-400">
          {unit.vampiricHeal && 'VAMPIRIC: Heals with every hit'}
        </span>

        <span className="text-red-600">
          {unit.weaknessDamage < 1 &&
            `WEAKENED: Deals ${unit.weaknessDamage.toFixed(1)}% damage`}
        </span>

        <span>
          {unit.armor < unit.initialArmor &&
            `VULNERABLE: Lost ${(unit.initialArmor - unit.armor).toFixed(
              1
            )} armor`}
        </span>

        <span className="text-red-600">
          {unit.magicResistance < 0 &&
            `BREACHED: ${unit.magicResistance * 10}% against magic`}
        </span>
      </div>
    </article>
  );
};
