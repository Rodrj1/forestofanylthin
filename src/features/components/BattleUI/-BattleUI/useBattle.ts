import { useContext } from 'react';
import { BattleContext } from '../../../../context/BattleContext';
import { skill, Army, Unit } from '../../../../types';
import { useSpells } from './useSpells';
import {
  breachResistances,
  curse,
  shatterArmor,
  weakness,
} from '../../../../data/Skills/DarkMagic';
import { attack } from '../../../../data/Skills/Combat';
import { iceSpear, rainOfFire } from '../../../../data/Skills/Destruction';
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
    setIsDamaging,
    setMagicUsedInTurn,
  } = useContext(BattleContext);

  const { spellSounds } = useActionSound();

  const {
    attackUnit,
    castShatterArmor,
    castWeakness,
    castCurse,
    castBreachResistances,
    castRainOfFire,
    castIceSpear,
    castReanimate,
    castVampiricLust,
  } = useSpells();

  const selectUnit = async (selectedUnit: Unit) => {
    const playingUnit = unitsInBoard[unitPosition];
    if (playingUnit.belongsTo == 'player') {
      getAction(action, selectedUnit);
    } else {
      let enemyAction = Math.floor(Math.random() * playingUnit.skills.length);
      if (enemyAction == 0) enemyAction = 1;
      if (playingUnit.skills[enemyAction].name == 'Dark Magic: Curse') {
        if (playingUnit.magic < 4) {
          enemyAction = 1;
        } else setMagicUsedInTurn(4);
      }
      if (playingUnit.skills[enemyAction].name == 'Dark Magic: Weakness') {
        if (playingUnit.magic < 2) {
          enemyAction = 1;
        } else setMagicUsedInTurn(2);
      }
      getAction(playingUnit.skills[enemyAction].name, selectedUnit);
    }
  };

  const getAction = (action: string, selectedUnit: Unit) => {
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
          spellSounds.weakness
        );
        break;
      case 'Dark Magic: Shatter Armor':
        handleAction(
          'shatter armor',
          shatterArmor,
          selectedUnit,
          castShatterArmor,
          spellSounds.shatterArmor
        );
        break;
      case 'Dark Magic: Curse':
        handleAction(
          'curse',
          curse,
          selectedUnit,
          castCurse,
          spellSounds.curse
        );
        break;
      case 'Dark Magic: Breach Resistances':
        handleAction(
          'breach resistances',
          breachResistances,
          selectedUnit,
          castBreachResistances,
          spellSounds.breachResistances
        );
        break;
      case 'Necromancy: Reanimate':
        handleAction(
          'reanimate',
          reanimate,
          selectedUnit,
          castReanimate,
          spellSounds.reanimate
        );
        break;
      case 'Necromancy: Vampiric Lust':
        handleAction(
          'vampiric lust',
          vampiricLust,
          selectedUnit,
          castVampiricLust,
          spellSounds.vampiricLust
        );
        break;
      case 'Destruction: Rain of Fire':
        handleAction(
          'rain of fire',
          rainOfFire,
          selectedUnit,
          castRainOfFire,
          spellSounds.rainOfFire
        );
        break;
      case 'Destruction: Ice Spear':
        handleAction(
          'ice spear',
          iceSpear,
          selectedUnit,
          castIceSpear,
          spellSounds.iceSpear
        );
        break;
    }
  };

  const handleAction = (
    action: string,
    skillDescription: skill,
    targetUnit: Unit,
    fn: (attackingUnit: Unit, attackedUnit: Unit) => Promise<Unit>,
    actionSound?: () => void
  ) => {
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

      const abilityCauseDamage =
        action == 'attack' || action == 'rain of fire' || action == 'ice spear';
      setIsDamaging(abilityCauseDamage);

      await waitTimer(1900);

      fn(playingUnit, targetUnit).then(async (updatedTargetUnit) => {
        await waitTimer(100);
        const isTargetUnitDead = updatedTargetUnit.updatedHealth < 0;
        setMagicUsedInTurn(0);

        if (isTargetUnitDead) {
          updatedTargetUnit.soundDeath();

          setDeadUnit(updatedTargetUnit);

          setShowBattleMessage(false);

          setIsDamaging(false);

          await waitTimer(1300);

          setDeadUnit({} as Unit);

          const attackerBelongsToPlayer = playingUnit.belongsTo == 'player';

          if (attackerBelongsToPlayer) {
            removeFromTargetArmy(
              updatedTargetUnit,
              enemyArmy,
              setEnemyArmy
            ).then((updatedBoard) => {
              checkNextTurn(updatedBoard);
            });
          } else {
            removeFromTargetArmy(
              updatedTargetUnit,
              playerArmy,
              setPlayerArmy
            ).then((updatedBoard) => {
              checkNextTurn(updatedBoard);
            });
          }
        } else if (!isTargetUnitDead) {
          checkNextTurn();

          setShowBattleMessage(false);
          setIsDamaging(false);
        }
      });
    });
    setAction('');
  };

  const handleMessage = (action: string, targetUnit: Unit) =>
    new Promise<string>((resolve) => {
      const playingUnit = unitsInBoard[unitPosition];
      switch (action) {
        case 'attack':
          let attackMessage = '';
          if (playingUnit.cursed) {
            attackMessage = `${playingUnit.name}
            attacks ${targetUnit.name} but is Cursed.`;
          } else {
            attackMessage = `${playingUnit.name}
          attacks ${targetUnit.name}`;
          }
          resolve(attackMessage);
          break;

        case 'weakness':
          resolve(`${playingUnit.name}
          casts Weakness on ${targetUnit.name}`);
          break;

        case 'shatter armor':
          resolve(`${playingUnit.name}
          casts Shatter Armor on ${targetUnit.name}`);
          break;

        case 'curse':
          resolve(`${playingUnit.name}
          casts Curse on ${targetUnit.name}`);
          break;

        case 'breach resistances':
          resolve(`${playingUnit.name}
            casts Breach Resistances on ${targetUnit.name}`);
          break;

        case 'reanimate':
          resolve(`${playingUnit.name}
            casts Reanimate on ${targetUnit.name}`);
          break;

        case 'vampiric lust':
          resolve(`${playingUnit.name}
            casts Vampiric Lust on ${targetUnit.name}`);
          break;

        case 'rain of fire':
          resolve(`${playingUnit.name}
          casts Rain of Fire`);
          break;
        case 'ice spear':
          resolve(`${playingUnit.name}
          casts Ice Spear on ${targetUnit.name}`);
          break;
      }
    });

  type updatedBoard = Army;

  const removeFromTargetArmy = async (
    targetUnit: Unit,
    targetArmy: Army,
    setTargetArmy: React.Dispatch<React.SetStateAction<Army>>
  ) =>
    new Promise<updatedBoard>((resolve) => {
      const updateUnitsInTargetArmy = targetArmy.filter(
        (units) => units.id != targetUnit.id
      );
      setTargetArmy(updateUnitsInTargetArmy);

      const updateUnitsInBoard = unitsInBoard.filter(
        (units) => units.id != targetUnit.id
      );
      setUnitsInBoard(updateUnitsInBoard);

      resolve(updateUnitsInBoard);
    });

  const checkNextTurn = (updatedBoard?: Army) => {
    if (updatedBoard) {
      handleBoardPosition(updatedBoard);
    } else {
      handleBoardPosition(unitsInBoard);
    }
  };

  const handleBoardPosition = (board: Army) => {
    const enemyTurn = `enemy${Math.floor(Math.random() * 5888891055)}`;
    const playingUnit = unitsInBoard[unitPosition];
    const nextPosition = board.indexOf(playingUnit) + 1;
    const nextUnit = board[nextPosition];

    if (nextUnit?.belongsTo == undefined) {
      resetBoardPositionToZero();
    } else {
      const nextTurnBelongsTo =
        nextUnit?.belongsTo == 'player' ? 'player' : enemyTurn;
      setTurn(nextTurnBelongsTo);
      setUnitPosition(nextPosition);
    }
  };

  const resetBoardPositionToZero = () => {
    if (unitsInBoard[0].belongsTo == 'player') setTurn('player');
    else setTurn('enemy');
    setUnitPosition(0);
  };

  return {
    selectUnit,
  };
};
