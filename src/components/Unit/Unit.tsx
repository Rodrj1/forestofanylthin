import { useContext } from "react";
import { useChangeVisibility } from "../../hooks/useVisibility";
import { UnitStats } from "../../types";
import { BattleContext } from "../../context/BattleContext";
import { useBattle } from "../../features/BattleBoard/useBattle";
import Bar from "../Bar/Bar";
import "./Units.scss";

interface Props {
  unit: UnitStats;
  isInHeroSelection?: boolean;
}

export const Unit = ({ unit, isInHeroSelection }: Props) => {
  const { isVisible, handleVisibility } = useChangeVisibility();

  const { selectUnit } = useBattle();
  const { action, turn, unitsInBoard, unitPosition } =
    useContext(BattleContext);

  const checkActionRequirement = () => {
    switch (action) {
      case "Dark Magic: Curse":
        if (unitsInBoard[unitPosition].magic >= 4) {
          selectUnit(unit);
        }
        break;
      case "Dark Magic: Weakness":
        if (unitsInBoard[unitPosition].magic >= 2) {
          selectUnit(unit);
        }
        break;
      case "Dark Magic: Shatter Armor":
        if (unitsInBoard[unitPosition].magic >= 3) {
          selectUnit(unit);
        }
        break;
      case "Destruction: Rain of Fire":
        if (unitsInBoard[unitPosition].magic >= 10) {
          selectUnit(unit);
        }
        break;
      default:
        selectUnit(unit);
        break;
    }
  };

  const handleSelectUnit = () => {
    if (turn == "player" && unit.belongsTo == "player") {
      if (
        action == "Necromancy: Reanimate" ||
        action == "Necromancy: Vampiric Lust"
      )
        if (unitsInBoard[unitPosition].magic >= 6) {
          selectUnit(unit, "isSelf");
        }
    }
    if (
      action != "" &&
      action != "Necromancy: Reanimate" &&
      action != "Necromancy: Vampiric Lust" &&
      turn == "player" &&
      unit.belongsTo == "enemy"
    ) {
      checkActionRequirement();
    } else if (isInHeroSelection == undefined && action == "") {
      handleVisibility();
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="unitCard" onClick={handleSelectUnit}>
        <img src={unit.portrait} />
        {isVisible && (
          <div className="stats">
            <span>{unit.name}</span>
            <span>
              Health:{" "}
              {(Math.round(Math.ceil(unit.updatedHealth) * 10) / 10).toFixed(1)}
            </span>
            <span>Magic: {unit.magic}</span>
            <span>Damage: {Math.ceil(unit.updatedDamage)}</span>
            <span>Armor: {unit.armor}</span>
            <span>Initiative: {unit.initiative}</span>
            <span>Type: {unit.type}</span>
          </div>
        )}
        {unit.type != "Hero" && !isVisible && (
          <span className="stack">{Math.ceil(unit.stack)}</span>
        )}
      </div>
      <div className="unitBars">
        <Bar
          value={unit.updatedHealth}
          maxValue={unit.health * unit.maxStack}
          type="health"
        />
        <Bar value={unit.magic} maxValue={unit.maxMagic} type="mana" />
        <div className="cursed">
          {unit.cursed && "CURSED"} {unit.vampiricHeal && "VAMPIRIC"}
        </div>
      </div>
    </div>
  );
};
