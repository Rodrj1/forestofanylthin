import { UnitStats } from "../../../types";
import deadUnitCSS from "./style.module.scss";

interface Props {
  deadUnit: UnitStats;
}

const DeadUnit = ({ deadUnit }: Props) => {
  return (
    <div className={deadUnitCSS.container}>
      <h2>{deadUnit.name} died!</h2>
      <img src={deadUnit.portrait} alt={deadUnit.name} />
    </div>
  );
};

export default DeadUnit;
