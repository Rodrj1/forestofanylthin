import { useContext } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { skill, UnitStats } from '../../../../types';
import { useSpells } from './useSpells';
import {
  curse,
  shatterArmor,
  weakness,
} from '../../../../data/Skills/DarkMagic';
import { attack } from '../../../../data/Skills/Combat';
import { rainOfFire } from '../../../../data/Skills/Destruction';
import { reanimate, vampiricLust } from '../../../../data/Skills/Necromancy';
import { useActionSound } from '../../../../hooks/useActionSound';
import { waitTimer } from '../../../../helpers/functions';

export const useBattle = () => {
  const {
    setTurn,
    action,
    setAction,
    unitsInBoard,
    unitPosition,
    setUnitPosition,
    setActionImage,
    setShowBattleMessage,
    setBattleMessageText,
    setPlayingUnit,
    setTargetUnit,
    setUnitsInBoard,
    enemyArmy,
    setEnemyArmy,
    playerArmy,
    setPlayerArmy,
    setDeadUnit,
  } = useContext(BattleContext);

  const { spellSounds } = useActionSound();

  const {
    attackUnit,
    castShatterArmor,
    castWeakness,
    castCurse,
    castRainOfFire,
    castReanimate,
    castVampiricLust,
  } = useSpells();

  const selectUnit = async (selectedUnit: UnitStats) => {
    const playingUnit = unitsInBoard[unitPosition];
    if (playingUnit.belongsTo == 'player') {
      getAction(action, selectedUnit, playerArmy);
    } else {
      let enemyAction = Math.floor(Math.random() * playingUnit.skills.length);
      if (enemyAction == 0) enemyAction = 1;
      if (playingUnit.skills[enemyAction].name == 'Dark Magic: Curse') {
        if (playingUnit.magic < 4) {
          enemyAction = 1;
        }
      }
      if (playingUnit.skills[enemyAction].name == 'Dark Magic: Weakness') {
        if (playingUnit.magic < 2) {
          enemyAction = 1;
        }
      }
      getAction(playingUnit.skills[enemyAction].name, selectedUnit, enemyArmy);
    }
  };

  const getAction = (
    action: string,
    selectedUnit: UnitStats,
    targetUnitArmy: UnitStats[]
  ) => {
    switch (action) {
      case 'Combat: Attack':
        handleAction('attack', attack, selectedUnit, attackUnit, undefined);
        break;
      case 'Dark Magic: Weakness':
        handleAction(
          'weakness',
          weakness,
          selectedUnit,
          castWeakness,
          undefined,
          spellSounds.weakness
        );
        break;
      case 'Dark Magic: Shatter Armor':
        handleAction(
          'shatter armor',
          shatterArmor,
          selectedUnit,
          castShatterArmor,
          undefined,
          spellSounds.shatterArmor
        );
        break;
      case 'Dark Magic: Curse':
        handleAction(
          'curse',
          curse,
          selectedUnit,
          castCurse,
          undefined,
          spellSounds.curse
        );
        break;
      case 'Necromancy: Reanimate':
        handleAction(
          'reanimate',
          reanimate,
          selectedUnit,
          castReanimate,
          undefined,
          spellSounds.reanimate
        );
        break;
      case 'Necromancy: Vampiric Lust':
        handleAction(
          'reanimate',
          vampiricLust,
          selectedUnit,
          castVampiricLust,
          undefined,
          spellSounds.vampiricLust
        );
        break;
      case 'Destruction: Rain of Fire':
        handleAction(
          'rain of fire',
          rainOfFire,
          selectedUnit,
          castRainOfFire,
          targetUnitArmy,
          spellSounds.rainOfFire
        );
        break;
    }
  };

  const handleAction = (
    action: string,
    skillDescription: skill,
    targetUnit: UnitStats,
    fn: (
      attackingUnit: UnitStats,
      attackedUnit: UnitStats
    ) => Promise<UnitStats>,
    targetUnitArmy?: UnitStats[],
    actionSound?: () => void
  ) => {
    const abilityIsAoe = targetUnitArmy != undefined;
    handleMessage(action, targetUnit).then(async (message) => {
      const playingUnit = unitsInBoard[unitPosition];

      if (action == 'attack') {
        playingUnit.soundAttack();
        targetUnit.soundHitted();
      }

      if (actionSound != undefined) actionSound();

      setPlayingUnit(playingUnit);
      setTargetUnit(targetUnit);
      setActionImage(skillDescription);
      setBattleMessageText(message);
      setShowBattleMessage(true);

      await waitTimer(1900);

      fn(playingUnit, targetUnit).then(async (updatedTargetUnit) => {
        const isTargetUnitDead = updatedTargetUnit.updatedHealth < 0;

        if (isTargetUnitDead) {
          updatedTargetUnit.soundDeath();

          setDeadUnit(updatedTargetUnit);

          setShowBattleMessage(false);

          await waitTimer(1300);

          setDeadUnit({} as UnitStats);

          const attackerBelongsToPlayer = playingUnit.belongsTo == 'player';

          if (attackerBelongsToPlayer) {
            removeFromTargetArmy(
              updatedTargetUnit,
              enemyArmy,
              setEnemyArmy
            ).then((data) => {
              checkNextTurn(data[0], data[1], data[2], abilityIsAoe);
            });
          } else {
            removeFromTargetArmy(
              updatedTargetUnit,
              playerArmy,
              setPlayerArmy
            ).then((data) => {
              checkNextTurn(data[0], data[1], data[2], abilityIsAoe);
            });
          }
        } else if (!isTargetUnitDead) {
          checkNextTurn(undefined, undefined, undefined, abilityIsAoe);
          setShowBattleMessage(false);
        }
      });
    });
    setAction('');
  };

  const handleMessage = (action: string, targetUnit: UnitStats) =>
    new Promise<string>((resolve) => {
      switch (action) {
        case 'attack':
          let attackMessage = '';
          if (unitsInBoard[unitPosition].cursed) {
            attackMessage = `${unitsInBoard[unitPosition].name}
            attacks ${targetUnit.name} but the CURSE nullifies all damage.`;
          } else {
            attackMessage = `${unitsInBoard[unitPosition].name}
          attacks ${targetUnit.name}`;
          }
          resolve(attackMessage);
          break;
        case 'weakness':
          resolve(`${unitsInBoard[unitPosition].name}
          casts Weakness on ${targetUnit.name}`);
          break;
        case 'shatter armor':
          resolve(`${unitsInBoard[unitPosition].name}
          casts Shatter Armor on ${targetUnit.name}`);
          break;

        case 'curse':
          resolve(`${unitsInBoard[unitPosition].name}
          casts Curse on ${targetUnit.name}`);
          break;

        case 'reanimate':
          resolve(`${unitsInBoard[unitPosition].name}
            casts Reanimate on ${targetUnit.name}`);
          break;

        case 'rain of fire':
          resolve(`${unitsInBoard[unitPosition].name}
          casts Rain of Fire`);
          break;
      }
    });

  type updatedBoard = UnitStats[];
  type attackerPosition = number;
  type targetPosition = number;

  const removeFromTargetArmy = async (
    targetUnit: UnitStats,
    targetArmy: UnitStats[],
    setTargetArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>
  ) =>
    new Promise<[updatedBoard, attackerPosition, targetPosition]>((resolve) => {
      const attackerPosition = unitPosition;
      const targetPosition = unitsInBoard.findIndex(
        (unit) => unit.id == targetUnit.id
      );

      const updateUnitsInTargetArmy = targetArmy.filter(
        (units) => units.id != targetUnit.id
      );
      setTargetArmy(updateUnitsInTargetArmy);

      const updateUnitsInBoard = unitsInBoard.filter(
        (units) => units.id != targetUnit.id
      );
      setUnitsInBoard(updateUnitsInBoard);

      resolve([updateUnitsInBoard, attackerPosition, targetPosition]);
    });

  const checkNextTurn = (
    updatedBoard?: UnitStats[],
    attackerPosition?: number,
    targetPosition?: number,
    isAOE?: boolean
  ) => {
    let nextTurnBelongsTo = '';

    const isAtBoardEnd = unitPosition == unitsInBoard.length - 1;

    if (!isAOE) {
      if (isAtBoardEnd) {
        nextTurnBelongsTo =
          unitsInBoard[0]?.belongsTo == 'player'
            ? 'player'
            : `enemy${Math.floor(Math.random() * 5888891055)}`;
        setTurn(nextTurnBelongsTo);
        setUnitPosition(0);
      } else {
        const someUnitDied =
          updatedBoard != undefined &&
          attackerPosition != undefined &&
          targetPosition != undefined;

        if (someUnitDied) {
          if (attackerPosition < targetPosition) {
            nextTurnBelongsTo =
              updatedBoard[unitPosition + 1]?.belongsTo == 'player'
                ? 'player'
                : `enemy${Math.floor(Math.random() * 5888891055)}`;
            setUnitPosition((pos) => pos + 1);
          } else if (attackerPosition > targetPosition) {
            setUnitPosition((pos) => pos);
            nextTurnBelongsTo =
              updatedBoard[unitPosition]?.belongsTo == 'player'
                ? 'player'
                : `enemy${Math.floor(Math.random() * 5888891055)}`;
          }
          setTurn(nextTurnBelongsTo);
        } else if (someUnitDied == false) {
          setUnitPosition((pos) => pos + 1);
          nextTurnBelongsTo =
            unitsInBoard[unitPosition + 1]?.belongsTo == 'player'
              ? 'player'
              : `enemy${Math.floor(Math.random() * 5888891055)}`;
          setTurn(nextTurnBelongsTo);
        }
      }
    }
  };

  return {
    selectUnit,
  };
};
