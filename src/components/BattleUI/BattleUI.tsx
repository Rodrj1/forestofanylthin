import { useContext, useEffect, useState } from "react";
import { BattleContext } from "../../context/BattleContext";
import { useBattle } from "../../features/BattleBoard/useBattle";
import BattleBoard from "./BattleBoard/BattleBoard";
import PlayerStack from "./PlayerStack/PlayerStack";
import UnitStack from "./EnemyStack/UnitStack";
import BattleCSS from "./BattleUI.module.scss";
import BattleMessage from "./BattleMessage/BattleMessage";
import DarkBackgroundWrapper from "../DarkWrapper/DarkWrapper";
import DeadUnit from "./DeadUnit/DeadUnit";

const BattleUI = () => {
  const {
    unitsInBoard,
    setUnitsInBoard,
    unitPosition,
    playerArmy,
    enemyArmy,
    isInFight,
    showBattleMessage,
    turn,
    deadUnit,
    setPlayerArmy,
    setEnemyArmy,
  } = useContext(BattleContext);

  const { selectUnit } = useBattle();
  const [playerKey, setPlayerKey] = useState<number>(0);
  const [enemyKey, setEnemyKey] = useState<number>(100);

  useEffect(() => {
    if (enemyArmy != undefined) {
      setUnitsInBoard(
        playerArmy
          .concat(enemyArmy)
          .sort((a, b) => b.initiative.localeCompare(a.initiative))
      );
    }
  }, [enemyArmy, playerArmy]);

  useEffect(() => {
    const playingUnit = unitsInBoard[unitPosition];
    if (
      playingUnit?.belongsTo == "enemy" &&
      turn == "enemy" &&
      deadUnit.name == undefined
    ) {
      let unitToSelect = Math.floor(Math.random() * playerArmy.length);
      const findUnitInArmy = playerArmy.find(
        (u) => u.id == playerArmy[unitToSelect].id
      );
      if (findUnitInArmy) {
        selectUnit(findUnitInArmy);
      }
    }
  }, [unitPosition, enemyArmy, playerArmy]);

  return (
    <>
      <div className={BattleCSS.container}>
        <BattleBoard />

        <br />

        {isInFight && (
          <div className={BattleCSS.units}>
            <div className={BattleCSS.playerStack}>
              <PlayerStack
                key={playerKey}
                playerKey={playerKey}
                setPlayerKey={setPlayerKey}
                BattleCSS={BattleCSS}
              />
            </div>
            <div className={BattleCSS.enemyStack}>
              <UnitStack
                key={enemyKey}
                enemyKey={enemyKey}
                setEnemyKey={setEnemyKey}
                BattleCSS={BattleCSS}
              />
            </div>
          </div>
        )}
      </div>

      {showBattleMessage && (
        <DarkBackgroundWrapper>
          <BattleMessage />
        </DarkBackgroundWrapper>
      )}

      {deadUnit.name != undefined && (
        <DarkBackgroundWrapper>
          <DeadUnit deadUnit={deadUnit} />
        </DarkBackgroundWrapper>
      )}
    </>
  );
};

export default BattleUI;
