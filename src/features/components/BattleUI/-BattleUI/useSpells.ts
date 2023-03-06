import { useContext } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { waitTimer } from '../../../../helpers/functions';
import { Unit } from '../../../../types';

export const useSpells = () => {
  const { setEnemyArmy, setPlayerArmy, setAction, enemyArmy } =
    useContext(BattleContext);

  // * Combat Skills

  const attackUnit = (attackingUnit: Unit, attackedUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      const calculatedDamage =
        Math.ceil(attackingUnit.updatedDamage) * (1 - attackedUnit.armor / 10);

      const isCursed = attackingUnit.cursed;

      const damage = isCursed == true ? 0 : calculatedDamage;

      if (isCursed) {
        if (attackingUnit.belongsTo == 'player')
          removeCurse(attackingUnit, setPlayerArmy);
        else removeCurse(attackingUnit, setEnemyArmy);
      }

      setAction('');

      attackDamage(attackedUnit, attackingUnit, damage).then(async (unit) => {
        resolve(unit);
      });
    });

  const attackDamage = (
    attackedUnit: Unit,
    attackingUnit: Unit,
    damage: number
  ) =>
    new Promise<Unit>((resolve) => {
      const isVampiric = attackingUnit.vampiricHeal;

      if (isVampiric) {
        if (attackingUnit.belongsTo == 'player') {
          vampiricHeal(attackingUnit, damage * 0.6, setPlayerArmy);
        } else vampiricHeal(attackingUnit, damage * 0.6, setEnemyArmy);
      }

      const stackLost = Math.floor(damage / attackedUnit.health);

      let attackedUnitNewDamage =
        attackedUnit.updatedDamage -
        attackedUnit.damage * stackLost * attackedUnit.weaknessDamage;

      if (attackedUnitNewDamage < 1) attackedUnitNewDamage = 1;

      const unitToUpdate = {
        ...attackedUnit,
        updatedHealth: attackedUnit.updatedHealth - damage,
        updatedDamage: Math.ceil(attackedUnitNewDamage),
        stack: attackedUnit.stack - damage / attackedUnit.health,
      };

      updateUnitsInvolvedInSpell(attackingUnit, unitToUpdate).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  const vampiricHeal = (
    unit: Unit,
    vampiricHeal: number,
    setUnitArmy: React.Dispatch<React.SetStateAction<Unit[]>>
  ) => {
    let newUnitHealth = unit.updatedHealth + vampiricHeal;

    if (newUnitHealth > unit.maxHealth) newUnitHealth = unit.maxHealth;

    const updateUnit = { ...unit, updatedHealth: newUnitHealth };
    setUnitArmy((prev) =>
      prev.map((unit) => {
        if (unit.id == updateUnit.id) {
          return updateUnit;
        }
        return unit;
      })
    );
  };

  // * Dark Magic Skills

  const castShatterArmor = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      let power = 0;

      if (castingUnit.type == 'Hero' && castingUnit.spellpower) {
        power = 1 + 1 * castingUnit.spellpower;
      } else if (castingUnit.type != 'Hero' && castingUnit.level) {
        power = 1 + 0.7 * castingUnit.stack + castingUnit.level / 2;
      }

      setAction('');

      const updateVulneredUnit = {
        ...targetUnit,
        armor: targetUnit.armor - power,
      };

      updateUnitsInvolvedInSpell(castingUnit, updateVulneredUnit, 3).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  const castBreachResistances = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      const power = 4;

      setAction('');

      const updateBreachedUnit = {
        ...targetUnit,
        magicResistance: targetUnit.magicResistance - power,
      };

      updateUnitsInvolvedInSpell(castingUnit, updateBreachedUnit, 3).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  const castWeakness = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      let power = 0;

      if (castingUnit.type == 'Hero' && castingUnit.spellpower) {
        power = 0.7 - 0.07 * castingUnit.spellpower;
      } else if (castingUnit.type != 'Hero' && castingUnit.level) {
        power = 0.8 - 0.03 * castingUnit.stack - castingUnit.level * 0.05;
      }

      setAction('');

      const updateTargetUnit = {
        ...targetUnit,
        weaknessDamage: power,
        updatedDamage: targetUnit.updatedDamage * power,
      };

      updateUnitsInvolvedInSpell(castingUnit, updateTargetUnit, 2).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  const castCurse = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      const updateCursedUnit = { ...targetUnit, cursed: true };

      updateUnitsInvolvedInSpell(castingUnit, updateCursedUnit, 4).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  // * Necromancy Skills

  const castReanimate = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>(async (resolve) => {
      setAction('');

      const getMaxHealth = targetUnit.maxHealth - targetUnit.updatedHealth;
      const getNewDamage = Math.ceil(getMaxHealth / targetUnit.damage);

      const updateTargetUnit = {
        ...targetUnit,
        updatedHealth: targetUnit.updatedHealth + getMaxHealth,
        updatedDamage: targetUnit.updatedDamage + getNewDamage,
        stack: targetUnit.maxStack,
      };

      updateUnitBenefical(castingUnit, updateTargetUnit, setPlayerArmy, 6);

      await waitTimer(100);

      resolve(updateTargetUnit);
    });

  const castVampiricLust = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>(async (resolve) => {
      setAction('');

      const updateTargetUnit = {
        ...targetUnit,
        vampiricHeal: true,
      };

      if (updateTargetUnit.belongsTo == 'player')
        updateUnitInArmy(updateTargetUnit, setPlayerArmy, 6);
      else updateUnitInArmy(updateTargetUnit, setEnemyArmy, 6);

      await waitTimer(100);

      resolve(updateTargetUnit);
    });

  // * Destruction Skills

  const castRainOfFire = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>(async (resolve) => {
      let power = 0;

      if (castingUnit.type == 'Hero' && castingUnit.spellpower) {
        power = 30 + 5 * castingUnit.spellpower;
      } else if (castingUnit.type != 'Hero' && castingUnit.level) {
        power = 10 + 3 * castingUnit.stack + castingUnit.level * 3;
      }

      setAction('');

      if (castingUnit.belongsTo == 'player') {
        updateUnitInArmy(castingUnit, setPlayerArmy, 10);
        updateArmy(enemyArmy, setEnemyArmy, power);
      }

      await waitTimer(100);

      resolve(targetUnit);
    });

  const castIceSpear = (castingUnit: Unit, targetUnit: Unit) =>
    new Promise<Unit>((resolve) => {
      const damage = 95 * (1 - targetUnit.magicResistance / 10);

      const stackLost = Math.floor(damage / targetUnit.health);

      let attackedUnitNewDamage =
        targetUnit.updatedDamage -
        targetUnit.damage * stackLost * targetUnit.weaknessDamage;

      if (attackedUnitNewDamage < 1) attackedUnitNewDamage = 1;

      const unitToUpdate = {
        ...targetUnit,
        updatedHealth: targetUnit.updatedHealth - damage,
        updatedDamage: Math.ceil(attackedUnitNewDamage),
        stack: targetUnit.stack - damage / targetUnit.health,
      };

      updateUnitsInvolvedInSpell(castingUnit, unitToUpdate, 7).then(
        (updatedUnit) => {
          resolve(updatedUnit);
        }
      );
    });

  const updateArmy = async (
    targetArmy: Unit[],
    setTargetArmy: React.Dispatch<React.SetStateAction<Unit[]>>,
    power: number
  ) => {
    const updateUnitsInArmy = targetArmy.map((unit) => {
      const unitStackInitialDamage = unit.updatedDamage;
      const unitStackLost = Math.floor(power / unit.health);
      const unitBaseDamage = unit.damage;
      const unitDamageReduced = unit.weaknessDamage;
      const unitDamageLost = unitStackLost * unitBaseDamage * unitDamageReduced;

      let unitUpdatedDamage = unitStackInitialDamage - unitDamageLost;

      if (unitUpdatedDamage < 1) unitUpdatedDamage = 1;

      return {
        ...unit,
        updatedHealth: unit.updatedHealth - power,
        updatedDamage: unitUpdatedDamage,
        stack: unit.stack - power / unit.health,
      };
    });

    setTargetArmy(updateUnitsInArmy.filter((units) => units.updatedHealth > 0));
  };

  const updateUnitBenefical = (
    castingUnit: Unit,
    updatedTargetUnit: Unit,
    setCastingUnitArmy: React.Dispatch<React.SetStateAction<Unit[]>>,
    magicCost: number
  ) => {
    setCastingUnitArmy((prev) =>
      prev.map((unit) => {
        if (unit.id == updatedTargetUnit.id) {
          if (unit.id == castingUnit.id) {
            return {
              ...updatedTargetUnit,
              magic: updatedTargetUnit.magic - magicCost,
            };
          } else {
            return updatedTargetUnit;
          }
        }
        if (unit.id == castingUnit.id) {
          return {
            ...castingUnit,
            magic: castingUnit.magic - magicCost,
          };
        }
        return unit;
      })
    );
  };

  const updateUnitsInvolvedInSpell = (
    castingUnit: Unit,
    updatedTargetUnit: Unit,
    magicCost?: number
  ) =>
    new Promise<Unit>(async (resolve) => {
      if (castingUnit.belongsTo == 'player') {
        if (magicCost) updateUnitInArmy(castingUnit, setPlayerArmy, magicCost);
        updateUnitInArmy(updatedTargetUnit, setEnemyArmy, 0);
      } else {
        if (magicCost) updateUnitInArmy(castingUnit, setEnemyArmy, magicCost);
        updateUnitInArmy(updatedTargetUnit, setPlayerArmy, 0);
      }
      resolve(updatedTargetUnit);
    });

  const updateUnitInArmy = (
    updatedUnit: Unit,
    setUpdatedArmy: React.Dispatch<React.SetStateAction<Unit[]>>,
    magicCost: number
  ) => {
    setUpdatedArmy((prev) =>
      prev.map((unit) => {
        if (unit.id == updatedUnit.id) {
          return { ...updatedUnit, magic: updatedUnit.magic - magicCost };
        }
        return unit;
      })
    );
  };

  const removeCurse = (
    castingUnit: Unit,
    setCursedUnitArmy: React.Dispatch<React.SetStateAction<Unit[]>>
  ) => {
    setCursedUnitArmy((prev) =>
      prev.map((unit) => {
        if (unit.id == castingUnit.id) {
          return {
            ...unit,
            cursed: false,
          };
        }
        return unit;
      })
    );
  };

  return {
    attackUnit,
    castShatterArmor,
    castWeakness,
    castCurse,
    castBreachResistances,
    castRainOfFire,
    castIceSpear,
    castReanimate,
    castVampiricLust,
  };
};
