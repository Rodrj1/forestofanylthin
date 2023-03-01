import { useContext, useEffect, useState } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { dryexaRanger } from '../../../data/unitstats/dryexa/dryexa';
import { skeleton } from '../../../data/unitstats/undead/undead';
import { UnitStats } from '../../../types';

export const useBattleHandler = () => {
  const {
    playerRace,
    setIsInFight,
    setEnemyArmy,
    setUnitPosition,
    playerArmy,
    setPlayerArmy,
    setUnitsInBoard,
    enemyArmy,
    setAddedDryexaRanger,
    setAddedSkeletons,
  } = useContext(BattleContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [levelsCompleted, setLevelsCompleted] = useState(0);

  const [isInCemetery, setIsInCemetery] = useState(false);
  const [isInGloomyForest, setIsInGloomyForest] = useState(false);
  const [isInLostGlade, setIsInLostGlade] = useState(false);
  const [isInSacre, setIsInSacre] = useState(false);

  const [isCemeteryCompleted, setIsCemeteryCompleted] = useState(false);
  const [isGloomyForestCompleted, setIsGloomyForestCompleted] = useState(false);
  const [isLostGladeCompleted, setIsLostGladeCompleted] = useState(false);
  const [isSacreCompleted, setIsSacreCompleted] = useState(false);

  const handleInFight = async (enemiesToAdd: UnitStats[], level?: string) => {
    switch (level) {
      case 'cemetery':
        setIsInCemetery(true);
        setIsCemeteryCompleted(true);
        break;
      case 'gloomyForest':
        setIsInGloomyForest(true);
        setIsGloomyForestCompleted(true);
        break;
      case 'lostGlade':
        setIsInLostGlade(true);
        setIsLostGladeCompleted(true);
        break;
      case 'sacre':
        setIsInSacre(true);
        setIsSacreCompleted(true);
        break;
    }
    setIsInFight(true);
    setEnemyArmy([...enemiesToAdd]);
    setUnitPosition(0);
  };

  const restoreArmyAfterFightIsEnded = () =>
    new Promise<UnitStats[]>((resolve) => {
      const updateArmy = playerArmy.map((unit) => {
        return {
          ...unit,
          stack: Math.ceil(unit.stack),
          maxStack: Math.ceil(unit.stack),
          updatedHealth: unit.health * Math.ceil(unit.stack),
          maxHealth: unit.health * Math.ceil(unit.stack),
          updatedDamage: unit.damage * Math.ceil(unit.stack),
          magic: unit.maxMagic,
          maxMagic: unit.maxMagic,
          cursed: false,
          vampiricHeal: false,
          weaknessDamage: 1,
        };
      });
      setPlayerArmy(updateArmy);
      resolve(updateArmy);
    });

  useEffect(() => {
    if (playerArmy.length == 0) {
      setIsInFight(false);
      setUnitsInBoard([]);
      setUnitPosition(0);
    }
    if (enemyArmy.length == 0 && isPlaying) {
      setIsInFight(false);
      setUnitsInBoard([]);
      setUnitPosition(0);
      if (isInCemetery) {
        setLevelsCompleted((current) => current + 1);
        if (playerRace == 'undead') {
          restoreArmyAfterFightIsEnded().then((healedArmy) => {
            const areSkeletonsInArmy = healedArmy.find(
              (unit) => unit.id == 'Skeleton'
            );
            if (areSkeletonsInArmy) {
              const addToArmy = healedArmy.map((unit) => {
                if (unit.id == 'Skeleton') {
                  return {
                    ...unit,
                    stack: unit.stack + 50,
                    updatedHealth: unit.updatedHealth + unit.health * 50,
                    updatedDamage: unit.updatedDamage + unit.damage * 50,
                    maxStack: unit.maxStack + 50,
                    maxHealth: unit.health * (unit.stack + 50),
                  };
                }
                return unit;
              });
              setPlayerArmy(addToArmy);
            } else {
              setPlayerArmy(
                healedArmy.concat({
                  ...skeleton,
                  stack: 50,
                  maxStack: 50,
                  maxHealth: skeleton.health * (skeleton.stack + 50),
                  updatedDamage: skeleton.damage * 50,
                  updatedHealth: skeleton.health * 50,
                  belongsTo: 'player',
                })
              );
            }
            setAddedSkeletons(true);
          });
        }
        setIsInCemetery(false);
      }
      if (isInGloomyForest) {
        setLevelsCompleted((current) => current + 1);
        restoreArmyAfterFightIsEnded().then((healedArmy) => {
          setPlayerArmy(
            healedArmy.concat({
              ...dryexaRanger,
              stack: 14,
              maxStack: 14,
              maxHealth: dryexaRanger.health * (dryexaRanger.stack + 14),
              updatedDamage: dryexaRanger.damage * 14,
              updatedHealth: dryexaRanger.health * 14,
              belongsTo: 'player',
            })
          );
        });
        setAddedDryexaRanger(true);
        setIsInGloomyForest(false);
      }
      if (isInLostGlade) {
        restoreArmyAfterFightIsEnded();
        setLevelsCompleted((current) => current + 1);
        setIsInLostGlade(false);
      }
      if (isInSacre) {
        restoreArmyAfterFightIsEnded();
        setLevelsCompleted((current) => current + 1);
        setIsInSacre(false);
      }
    }
  }, [enemyArmy, playerArmy]);

  return {
    isInCemetery,
    isInGloomyForest,
    isInLostGlade,
    isInSacre,
    isCemeteryCompleted,
    isGloomyForestCompleted,
    isLostGladeCompleted,
    isSacreCompleted,
    isPlaying,
    setIsPlaying,
    levelsCompleted,
    handleInFight,
  };
};
