import { useEffect, useState } from 'react';
import { Unit } from '../components/Unit/Unit';
import { UnitStats } from '../types';

interface Props {
  army: UnitStats[];
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

export const useArmyUpdater = ({ army, key, setKey }: Props) => {
  const [storeArmy, setStoreArmy] = useState(army);
  const [storeKey, setStoreKey] = useState(key);

  useEffect(() => {
    setStoreArmy([...army]);
    setStoreKey((n) => n + 1);
    setKey(storeKey);
  }, [army]);

  const showArmy = storeArmy.map((unit) => <Unit unit={unit} key={unit.id} />);

  return { showArmy };
};
