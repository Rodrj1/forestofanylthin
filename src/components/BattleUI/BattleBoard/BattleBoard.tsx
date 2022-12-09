import { useContext, useEffect } from "react";
import { BattleContext } from "../../../context/BattleContext";
import { useUnitPreview } from "../../../features/UnitPreview/useUnitPreview";
import UnitPreview from "../../PlayerUI/UnitPreview/UnitPreview";
import DarkBackgroundWrapper from "../../DarkWrapper/DarkWrapper";
import BoardCSS from "./BattleBoard.module.scss";

const BattleBoard = () => {
  const { unitsInBoard, setTurn, unitPosition } = useContext(BattleContext);
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  const mapUnitsInBoard = unitsInBoard.map((unit) => {
    if (unit) {
      if (unit.belongsTo == "player") {
        if (unit?.id == unitsInBoard[unitPosition]?.id) {
          return (
            <img
              className={BoardCSS.playing}
              key={unit.id}
              src={unit.face}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        } else
          return (
            <img
              src={unit.face}
              key={unit.id}
              className={BoardCSS.player}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
      } else if (unit.belongsTo == "enemy") {
        if (unit?.id == unitsInBoard[unitPosition]?.id) {
          return (
            <img
              src={unit.face}
              className={BoardCSS.playing}
              key={unit.id}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        } else {
          return (
            <img
              src={unit.face}
              key={unit.id}
              className={BoardCSS.enemy}
              alt={unit.id}
              onClick={() => handleUnitPreview(unit)}
            />
          );
        }
      }
    }
  });

  useEffect(() => {
    if (unitsInBoard != undefined && unitPosition == 0) {
      if (unitsInBoard[0]?.belongsTo == "player") {
        setTurn("player");
      } else if (unitsInBoard[0]?.belongsTo == "enemy") {
        setTurn("enemy");
      }
    }
  }, [unitsInBoard]);

  if (unitsInBoard == undefined) return <h1>Load</h1>;

  return (
    <>
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}
      <div className={BoardCSS.container}>{mapUnitsInBoard}</div>
    </>
  );
};

export default BattleBoard;
