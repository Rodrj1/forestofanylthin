import { useContext } from "react";
import { BattleContext } from "../../context/BattleContext";
import { waitTimer } from "../../helpers/functions/waitTimer";
import { skill, UnitStats } from "../../types";
import { useSpells } from "./useSpells";
import { curse, shatterArmor, weakness } from "../../data/Skills/DarkMagic";
import { attack } from "../../data/Skills/Combat";
import { rainOfFire } from "../../data/Skills/Destruction";
import { useActionSound } from "../../hooks/useSound";
import { reanimate, vampiricLust } from "../../data/Skills/Necromancy";

export const useBattle = () => {
  const {
    setTurn,
    action,
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

  const selectUnit = async (selectedUnit: UnitStats, type?: string) => {
    const playingUnit = unitsInBoard[unitPosition];
    if (playingUnit.belongsTo == "player") playerAction(action, selectedUnit);
    else {
      playingUnit.soundAttack();
      selectedUnit.soundHitted();

      const message = `${unitsInBoard[unitPosition].name}
      attacks ${selectedUnit.name}`;

      setPlayingUnit(unitsInBoard[unitPosition]);
      setTargetUnit(selectedUnit);
      setActionImage(attack);
      setBattleMessageText(message);
      setShowBattleMessage(true);

      await waitTimer(1000);

      attackUnit(playingUnit, selectedUnit).then(async (newSelectedUnit) => {
        if (newSelectedUnit.updatedHealth < 0) {
          newSelectedUnit.soundDeath();

          setDeadUnit(newSelectedUnit);

          setShowBattleMessage(false);

          await waitTimer(1000);

          setDeadUnit({} as UnitStats);

          removeFromBattle(newSelectedUnit, playerArmy, setPlayerArmy).then(
            (updatedBoard) => {
              setUnitPosition(pos => pos -  1);
              checkNextTurnPlayer(updatedBoard).then(() => {
                checkPositionInBoard();
              });
            }
          );
        } else {
          checkNextTurnPlayer().then(() => {
            setShowBattleMessage(false);
            checkPositionInBoard();
          });
        }
      });
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
    actionSound?: () => void
  ) => {
    handleMessage(action, targetUnit).then(async (message) => {
      const playingUnit = unitsInBoard[unitPosition];

      if (action == "attack") {
        playingUnit.soundAttack();
        targetUnit.soundHitted();
      }

      if (actionSound != undefined) actionSound();

      setPlayingUnit(playingUnit);
      setTargetUnit(targetUnit);
      setActionImage(skillDescription);
      setBattleMessageText(message);
      setShowBattleMessage(true);

      await waitTimer(1000);

      fn(playingUnit, targetUnit).then(async (updatedTargetUnit) => {
        if (updatedTargetUnit.updatedHealth < 0) {
          updatedTargetUnit.soundDeath();

          setDeadUnit(updatedTargetUnit);

          setShowBattleMessage(false);

          await waitTimer(1000);

          setDeadUnit({} as UnitStats);

          removeFromBattle(updatedTargetUnit, enemyArmy, setEnemyArmy).then(
            (updatedBoard) => {
              setUnitPosition(pos => pos -  1);
              checkNextTurnPlayer(updatedBoard).then(() => {
                checkPositionInBoard();
              });
            }
          );
        } else {
          checkNextTurnPlayer().then(() => {
            setShowBattleMessage(false);
            checkPositionInBoard();
          });
        }
      });
    });
  };

  const removeFromBattle = async (
    targetUnit: UnitStats,
    targetArmy: UnitStats[],
    setTargetArmy: React.Dispatch<React.SetStateAction<UnitStats[]>>
  ) =>
    new Promise<UnitStats[]>((resolve) => {
      const removeUnitFromArmy = targetArmy.filter(
        (units) => units.id != targetUnit.id
      );
      setTargetArmy(removeUnitFromArmy);

      const removeUnitFromBoard = unitsInBoard.filter(
        (units) => units.id != targetUnit.id
      );
      setUnitsInBoard(removeUnitFromBoard);
      resolve(removeUnitFromBoard);
    });

  const checkNextTurnPlayer = (updatedBoard?: UnitStats[]) =>
    new Promise<void>((resolve) => {
      let nextTurn = "";
      if (updatedBoard) {
        nextTurn =
          updatedBoard[unitPosition]?.belongsTo == "player"
            ? "player"
            : "enemy";
      } else {
        nextTurn =
          unitsInBoard[unitPosition + 1]?.belongsTo == "player"
            ? "player"
            : "enemy";
      }
      resolve(setTurn(nextTurn));
    });

  const checkPositionInBoard = () => {
    if (unitPosition == unitsInBoard.length - 1) {
      setUnitPosition(0);
      const initialTurn =
        unitsInBoard[0]?.belongsTo == "player" ? "player" : "enemy";
      setTurn(initialTurn);
    } else {
      setUnitPosition((pos) => pos + 1);
    }
  };

  const playerAction = (action: string, selectedUnit: UnitStats) => {
    switch (action) {
      case "Combat: Attack":
        handleAction("attack", attack, selectedUnit, attackUnit);
        break;
      case "Dark Magic: Weakness":
        handleAction(
          "weakness",
          weakness,
          selectedUnit,
          castWeakness,
          spellSounds.weakness
        );
        break;
      case "Dark Magic: Shatter Armor":
        handleAction(
          "shatter armor",
          shatterArmor,
          selectedUnit,
          castShatterArmor,
          spellSounds.shatterArmor
        );
        break;
      case "Dark Magic: Curse":
        handleAction(
          "curse",
          curse,
          selectedUnit,
          castCurse,
          spellSounds.curse
        );
        break;
      case "Necromancy: Reanimate":
        handleAction(
          "reanimate",
          reanimate,
          selectedUnit,
          castReanimate,
          spellSounds.reanimate
        );
        break;
      case "Necromancy: Vampiric Lust":
        handleAction(
          "reanimate",
          vampiricLust,
          selectedUnit,
          castVampiricLust,
          spellSounds.vampiricLust
        );
        break;
      case "Destruction: Rain of Fire":
        handleAction(
          "rain of fire",
          rainOfFire,
          selectedUnit,
          castRainOfFire,
          spellSounds.rainOfFire
        );

        break;
    }
  };

  const handleMessage = (action: string, targetUnit: UnitStats) =>
    new Promise<string>((resolve) => {
      switch (action) {
        case "attack":
          resolve(`${unitsInBoard[unitPosition].name}
          attacks ${targetUnit.name}`);
          break;
        case "weakness":
          resolve(`${unitsInBoard[unitPosition].name}
          casts Weakness on ${targetUnit.name}`);
          break;
        case "shatter armor":
          resolve(`${unitsInBoard[unitPosition].name}
          casts Shatter Armor on ${targetUnit.name}`);
          break;

        case "curse":
          resolve(`${unitsInBoard[unitPosition].name}
          casts Curse on ${targetUnit.name}`);
          break;

        case "reanimate":
          resolve(`${unitsInBoard[unitPosition].name}
            casts Reanimate on ${targetUnit.name}`);
          break;

        case "rain of fire":
          resolve(`${unitsInBoard[unitPosition].name}
          casts Rain of Fire`);
          break;
      }
    });

  return {
    selectUnit,
  };
};
