import { useContext, useEffect, useRef, useState } from 'react';
import { BattleContext } from '../../../../context/BattleContext';

export const useDisplayBars = () => {
  const {
    magicUsedInTurn,
    playingUnit,
    targetUnit,
    battleMessageText,
    actionImage,
    isDamaging,
  } = useContext(BattleContext);

  const targetHealth = targetUnit.updatedHealth;
  const targetMaxHealth = targetUnit.maxHealth;

  let attackerDamage = playingUnit.updatedDamage * (1 - targetUnit.armor / 10);
  const attackerIsCursed = playingUnit.cursed;

  if (targetHealth - attackerDamage < 0) attackerDamage = targetHealth;

  const [updateHealth, setUpdateHealth] = useState(targetHealth);

  const [updateMagic, setUpdateMagic] = useState(playingUnit.magic);

  const isMagicUsed = magicUsedInTurn != 0;

  const barInterval = useRef<any>(null);
  const msUpdate = 25;
  const totalTicks = 76;

  const updateHealthBar = () => {
    setUpdateHealth((current) => current - attackerDamage / totalTicks);
  };

  const updateManaBar = () => {
    setUpdateMagic((current) => current - magicUsedInTurn / totalTicks);
  };

  useEffect(() => {
    if (isDamaging && attackerIsCursed == false) {
      if (isMagicUsed) {
        barInterval.current = setInterval(() => {
          updateHealthBar();
          updateManaBar();
        }, msUpdate);
      } else
        barInterval.current = setInterval(() => {
          updateHealthBar();
        }, msUpdate);

      return () => {
        clearInterval(barInterval.current);
      };
    }

    if (!isDamaging) {
      barInterval.current = setInterval(() => {
        updateManaBar();
      }, msUpdate);

      return () => {
        clearInterval(barInterval.current);
      };
    }
  }, []);

  return {
    playingUnit,
    targetUnit,
    battleMessageText,
    actionImage,
    isDamaging,
    isMagicUsed,
    updateMagic,
    attackerIsCursed,
    updateHealth,
    targetMaxHealth,
    attackerDamage
  };
};
