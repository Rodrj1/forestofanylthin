import { useContext, useEffect, useState } from "react";
import { BattleContext } from "../../../context/BattleContext";
import { Unit } from "../../Unit/Unit";

interface Props {
  enemyKey: number;
  setEnemyKey: React.Dispatch<React.SetStateAction<number>>;
  BattleCSS: CSSModuleClasses;
}

const UnitStack = ({ enemyKey, setEnemyKey, BattleCSS }: Props) => {
  const { enemyArmy } = useContext(BattleContext);

  const [storeArmy, setStoreArmy] = useState(enemyArmy);
  const [storeKey, setStoreKey] = useState(enemyKey);

  useEffect(() => {
    if (enemyArmy) setStoreArmy([...enemyArmy]);
    setStoreKey((n) => n + 1);
    setEnemyKey(storeKey);
  }, [enemyArmy]);

  const showArmy = storeArmy.map((unit) => <Unit unit={unit} key={unit.id} />);

  return <div className={BattleCSS.tempered}>{showArmy}</div>;
};

export default UnitStack;
