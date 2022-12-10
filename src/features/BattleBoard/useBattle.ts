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

  const selectUnit = async (selectedUnit: UnitStats) => {
    const playingUnit = unitsInBoard[unitPosition];
    if (playingUnit.belongsTo == "player") {
      getAction(action, selectedUnit, playerArmy);
    } else {
      let enemyAction = Math.floor(Math.random() * playingUnit.skills.length);
      if (enemyAction == 0) enemyAction = 1;
      if (playingUnit.skills[enemyAction].name == "Dark Magic: Curse") {
        if (playingUnit.magic < 4) {
          enemyAction = 1;
        }
      }
      if (playingUnit.skills[enemyAction].name == "Dark Magic: Weakness") {
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
    playingUnitArmy: UnitStats[]
  ) => {
    switch (action) {
      case "Combat: Attack":
        handleAction(
          "attack",
          attack,
          selectedUnit,
          attackUnit,
          playingUnitArmy
        );
        break;
      case "Dark Magic: Weakness":
        handleAction(
          "weakness",
          weakness,
          selectedUnit,
          castWeakness,
          playingUnitArmy,
          spellSounds.weakness
        );
        break;
      case "Dark Magic: Shatter Armor":
        handleAction(
          "shatter armor",
          shatterArmor,
          selectedUnit,
          castShatterArmor,
          playingUnitArmy,
          spellSounds.shatterArmor
        );
        break;
      case "Dark Magic: Curse":
        handleAction(
          "curse",
          curse,
          selectedUnit,
          castCurse,
          playingUnitArmy,
          spellSounds.curse
        );
        break;
      case "Necromancy: Reanimate":
        handleAction(
          "reanimate",
          reanimate,
          selectedUnit,
          castReanimate,
          playingUnitArmy,
          spellSounds.reanimate
        );
        break;
      case "Necromancy: Vampiric Lust":
        handleAction(
          "reanimate",
          vampiricLust,
          selectedUnit,
          castVampiricLust,
          playingUnitArmy,
          spellSounds.vampiricLust
        );
        break;
      case "Destruction: Rain of Fire":
        handleAction(
          "rain of fire",
          rainOfFire,
          selectedUnit,
          castRainOfFire,
          playingUnitArmy,
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
    playingUnitArmy: UnitStats[],
    actionSound?: () => void
  ) => {
    handleMessage(action, targetUnit).then(async (message) => {
      const playingUnit = unitsInBoard[unitPosition];
      const findUnitInArmy = playingUnitArmy.find(
        (unit) => unit.id == playingUnit.id
      );

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

      await waitTimer(1900);

      if (findUnitInArmy) {
        fn(findUnitInArmy, targetUnit).then(async (updatedTargetUnit) => {
          if (updatedTargetUnit.updatedHealth < 0) {
            updatedTargetUnit.soundDeath();

            setDeadUnit(updatedTargetUnit);

            setShowBattleMessage(false);

            await waitTimer(1300);

            setDeadUnit({} as UnitStats);

            if (findUnitInArmy.belongsTo == "player") {
              removeFromBattle(updatedTargetUnit, enemyArmy, setEnemyArmy).then(
                (updatedBoard) => {
                  checkNextTurn(updatedBoard);
                }
              );
            } else {
              removeFromBattle(
                updatedTargetUnit,
                playerArmy,
                setPlayerArmy
              ).then((updatedBoard) => {
                checkNextTurn(updatedBoard);
              });
            }
          } else {
            checkNextTurn();
            setShowBattleMessage(false);
          }
        });
      }
    });
  };

  const handleMessage = (action: string, targetUnit: UnitStats) =>
    new Promise<string>((resolve) => {
      switch (action) {
        case "attack":
          let attackMessage = "";
          if (unitsInBoard[unitPosition].cursed) {
            attackMessage = `${unitsInBoard[unitPosition].name}
            attacks ${targetUnit.name} but the CURSE nullifies all damage.`;
          } else {
            attackMessage = `${unitsInBoard[unitPosition].name}
          attacks ${targetUnit.name}`;
          }
          resolve(attackMessage);
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

  const checkNextTurn = (updatedBoard?: UnitStats[]) => {
    setUnitPosition((pos) => pos + 1);
    let nextTurn = "";
    if (updatedBoard) {
      setUnitPosition((pos) => pos - 1);
      nextTurn =
        updatedBoard[unitPosition]?.belongsTo == "player"
          ? "player"
          : `enemy${Math.floor(Math.random() * 5888891055)}`;
    } else {
      nextTurn =
        unitsInBoard[unitPosition + 1]?.belongsTo == "player"
          ? "player"
          : `enemy${Math.floor(Math.random() * 5888891055)}`;
    }
    if (unitPosition == unitsInBoard.length - 1) {
      setUnitPosition(0);
      const initialTurn =
        unitsInBoard[0]?.belongsTo == "player"
          ? "player"
          : `enemy${Math.floor(Math.random() * 5888891055)}`;
      setTurn(initialTurn);
    } else setTurn(nextTurn);
  };

  return {
    selectUnit,
  };
};
