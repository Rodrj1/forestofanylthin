import { useContext, useEffect } from "react";
import { BattleContext } from "../../context/BattleContext";
import { waitTimer } from "../../helpers/functions/waitTimer";
import { UnitStats } from "../../types";

export const useSpells = () => {
  const {
    isInFight,
    playerArmy,
    setEnemyArmy,
    setPlayerArmy,
    setAction,
    enemyArmy,
    unitPosition,
    setUnitPosition,
    unitsInBoard,
  } = useContext(BattleContext);

  // * Combat Skills

  const attackUnit = (attackingUnit: UnitStats, attackedUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      const isCursed = attackingUnit.cursed;

      const calculatedDamage =
        Math.ceil(attackingUnit.updatedDamage) * (1 - attackedUnit.armor / 10);

      const damage = isCursed == true ? 0 : calculatedDamage;

      if (isCursed) {
        if (attackingUnit.belongsTo == "player")
          removeCurse(attackingUnit, setPlayerArmy);
        else removeCurse(attackingUnit, setEnemyArmy);
      }

      setAction("");

      attackDamage(attackedUnit, attackingUnit, damage).then(async (unit) => {
        resolve(unit);
      });
    });

  const attackDamage = (
    attackedUnit: UnitStats,
    attackingUnit: UnitStats,
    damage: number
  ) =>
    new Promise<UnitStats>(async (resolve) => {
      const isVampiric = attackingUnit.vampiricHeal;

      if (isVampiric) {
        if (attackingUnit.belongsTo == "player") {
          vampiricHeal(attackingUnit, damage * 0.6, setPlayerArmy);
        } else vampiricHeal(attackingUnit, damage * 0.6, setEnemyArmy);
      }

      const stackLost = Math.floor(damage / attackedUnit.health);

      let attackedUnitNewDamage =
        attackedUnit.updatedDamage -
        attackedUnit.damage * stackLost * attackedUnit.weaknessDamage;

      if (attackedUnitNewDamage < 1) attackedUnitNewDamage = 1;

      const newAttackedUnit = {
        ...attackedUnit,
        updatedHealth: attackedUnit.updatedHealth - damage,
        updatedDamage: Math.ceil(attackedUnitNewDamage),
        stack: attackedUnit.stack - damage / attackedUnit.health,
      };

      updateUnitsInvolvedInSpell(attackingUnit, newAttackedUnit).then(
        (updatedNewAttackedUnit) => {
          resolve(updatedNewAttackedUnit);
        }
      );
    });

  const vampiricHeal = (
    unit: UnitStats,
    vampiricHeal: number,
    setUnitArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>
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

  const castShatterArmor = (castingUnit: UnitStats, targetUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      let power = 0;

      if (castingUnit.type == "Hero" && castingUnit.spellpower) {
        power = 0.7 - 0.07 * castingUnit.spellpower;
      } else if (castingUnit.type != "Hero" && castingUnit.level) {
        power = 0.8 - 0.05 * castingUnit.stack - castingUnit.level * 0.05;
      }

      setAction("");

      const updateVulneredUnit = {
        ...targetUnit,
        armor: targetUnit.armor - targetUnit.armor * power,
      };
      updateUnitsInvolvedInSpell(castingUnit, updateVulneredUnit, 3);

      await waitTimer(100);

      resolve(updateVulneredUnit);
    });

  const castWeakness = (castingUnit: UnitStats, targetUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      let power = 0;

      if (castingUnit.type == "Hero" && castingUnit.spellpower) {
        power = 0.7 - 0.07 * castingUnit.spellpower;
      } else if (castingUnit.type != "Hero" && castingUnit.level) {
        power = 0.8 - 0.05 * castingUnit.stack - castingUnit.level * 0.05;
      }

      setAction("");

      const updateWeakenedUnit = {
        ...targetUnit,
        weaknessDamage: power,
        updatedDamage: targetUnit.updatedDamage * power,
      };

      updateUnitsInvolvedInSpell(castingUnit, updateWeakenedUnit, 2);

      await waitTimer(100);

      resolve(updateWeakenedUnit);
    });

  const castCurse = (castingUnit: UnitStats, targetUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      const updateCursedUnit = { ...targetUnit, cursed: true };

      updateUnitsInvolvedInSpell(castingUnit, updateCursedUnit, 4);

      await waitTimer(100);

      resolve(updateCursedUnit);
    });

  // * Necromancy Skills

  const castReanimate = (castingUnit: UnitStats, targetUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      setAction("");

      const getMaxHealth = targetUnit.maxHealth - targetUnit.updatedHealth;
      const getNewDamage = Math.ceil(getMaxHealth / targetUnit.damage);

      const updateReanimatedUnit = {
        ...targetUnit,
        updatedHealth: targetUnit.updatedHealth + getMaxHealth,
        updatedDamage: targetUnit.updatedDamage + getNewDamage,
        stack: targetUnit.maxStack,
      };

      updateUnitBenefical(castingUnit, updateReanimatedUnit, setPlayerArmy, 6);

      await waitTimer(100);

      resolve(updateReanimatedUnit);
    });

  const castVampiricLust = (castingUnit: UnitStats, targetUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      setAction("");

      const updateVampiricUnit = {
        ...targetUnit,
        vampiricHeal: true,
      };

      if (updateVampiricUnit.belongsTo == "player")
        updateUnitInArmy(updateVampiricUnit, setPlayerArmy, 6);
      else updateUnitInArmy(updateVampiricUnit, setEnemyArmy, 6);

      await waitTimer(100);

      resolve(updateVampiricUnit);
    });

  // * Destruction Skills

  const castRainOfFire = (castingUnit: UnitStats) =>
    new Promise<UnitStats>(async (resolve) => {
      let power = 0;

      if (castingUnit.type == "Hero" && castingUnit.spellpower) {
        power = 20 + 5 * castingUnit.spellpower;
      } else if (castingUnit.type != "Hero" && castingUnit.level) {
        power = 10 + 3 * castingUnit.stack + castingUnit.level * 3;
      }

      setAction("");

      if (castingUnit.belongsTo == "player") {
        updateUnitInArmy(castingUnit, setPlayerArmy, 10);
        updateArmy(enemyArmy, setEnemyArmy, power);
      }

      await waitTimer(100);

      resolve(castingUnit);
    });

  const updateArmy = async (
    targetArmy: UnitStats[],
    setTargetArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>,
    power: number
  ) => {
    const updateUnitssInArmy = targetArmy.map((unit) => {
      const stackLost = Math.floor(power / unit.health);

      let attackedUnitNewDamage =
        unit.updatedDamage - unit.damage * stackLost * unit.weaknessDamage;
      if (attackedUnitNewDamage < 1) attackedUnitNewDamage = 1;

      return {
        ...unit,
        updatedHealth: unit.updatedHealth - power,
        updatedDamage: attackedUnitNewDamage,
        stack: unit.stack - power / unit.health,
      };
    });

    setTargetArmy(
      updateUnitssInArmy.filter((units) => units.updatedHealth > 0)
    );

    let unitsKilled = 0;
    updateUnitssInArmy.reduce((acc, unit) => {
      if (unit.updatedHealth < 0) {
        unitsKilled++;
      }
      return acc;
    });

    setUnitPosition((pos) => {
      const NewPosition = pos - unitsKilled;
      if (unitsInBoard[unitPosition + unitsKilled + 1] == undefined) {
        return pos / pos - 2;
      }
      if (NewPosition < 0) {
        return NewPosition + unitsKilled - 1;
      }
      if (pos == pos - unitsKilled) {
        return pos;
      } else {
        return pos - 1;
      }
    });
  };

  const updateUnitBenefical = (
    castingUnit: UnitStats,
    updatedTargetUnit: UnitStats,
    setCastingUnitArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>,
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
    castingUnit: UnitStats,
    updatedTargetUnit: UnitStats,
    magicCost?: number
  ) =>
    new Promise<UnitStats>(async (resolve) => {
      if (castingUnit.belongsTo == "enemy") {
        if (magicCost) updateUnitInArmy(castingUnit, setEnemyArmy, magicCost);
        updateUnitInArmy(updatedTargetUnit, setPlayerArmy, 0);
      }
      if (castingUnit.belongsTo == "player") {
        if (magicCost) updateUnitInArmy(castingUnit, setPlayerArmy, magicCost);
        updateUnitInArmy(updatedTargetUnit, setEnemyArmy, 0);
      }
      resolve(updatedTargetUnit);
    });

  const updateUnitInArmy = (
    updatedUnit: UnitStats,
    setUpdatedArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>,
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
    castingUnit: UnitStats,
    setCastingUnitArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>
  ) => {
    setCastingUnitArmy((prev) =>
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
    castRainOfFire,
    castReanimate,
    castVampiricLust,
  };
};
