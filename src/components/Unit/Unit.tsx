import { useContext, useState } from 'react';
import { UnitStats } from '../../types';
import { BattleContext } from '../../context/BattleContext';
import { useBattle } from '../../features/components/BattleUI';
import { Bar } from '../Bar';
import damage from '../../assets/images/stats/damage.png';
import armor from '../../assets/images/stats/armor.png';
import hourglass from '../../assets/images/stats/hourglass.png';

interface Props {
  unit: UnitStats;
}

const spellsCost = {
  'Combat: Attack': 0,
  'Combat: Clear Action': 0,
  'Dark Magic: Curse': 4,
  'Dark Magic: Weakness': 2,
  'Dark Magic: Shatter Armor': 3,
  'Dark Magic: Breach Resistances': 3,
  'Destruction: Rain of Fire': 10,
  'Destruction: Ice Spear': 7,
  'Necromancy: Reanimate': 6,
  'Necromancy: Vampiric Lust': 6,
};

export const Unit = ({ unit }: Props) => {
  const { selectUnit } = useBattle();
  const { action, turn, unitsInBoard, unitPosition, setMagicUsedInTurn } =
    useContext(BattleContext);

  const handleActionRequirement = () => {
    const playingUnitMagic = unitsInBoard[unitPosition].magic;

    const cost = spellsCost[action];

    if (playingUnitMagic >= cost) {
      setMagicUsedInTurn(cost);

      selectUnit(unit);
    }
  };

  const handleSelectUnit = () => {
    const targetUnitBenefical = unit.belongsTo == 'player';

    if (turn == 'player' && targetUnitBenefical) {
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
      action != 'Combat: Clear Action' &&
      action != 'Necromancy: Reanimate' &&
      action != 'Necromancy: Vampiric Lust' &&
      turn == 'player' &&
      unit.belongsTo == 'enemy'
    ) {
      handleActionRequirement();
    }
  };

  const [hoverEffect, setHoverEffect] = useState(false);

  return (
    <article className="min-w-[200px] relative">
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
          {unit.magicResistance < 0 &&
            `BREACHED: ${unit.magicResistance * 10}% against magic`}
        </span>
      </div>

      <div className="flex flex-col gap-3 items-center absolute top-2 -right-7">
        <div className="flex flex-col justify-center items-center">
          <img src={damage} alt="attack" className={'statStyleSmaller'} />

          <span
            className={`text-sm ${unit.weaknessDamage < 1 && 'text-red-600'}`}
          >
            {unit.updatedDamage.toFixed(0)}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={armor} alt="armor" className={'statStyleSmaller'} />

          <span
            className={`text-sm ${
              unit.armor < unit.initialArmor && 'text-red-600'
            }`}
          >
            {unit.armor.toFixed(0)}
          </span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img
            src={hourglass}
            alt="initiative"
            className={'statStyleSmaller'}
          />

          <span className="text-sm">{unit.initiative}</span>
        </div>
      </div>
    </article>
  );
};
