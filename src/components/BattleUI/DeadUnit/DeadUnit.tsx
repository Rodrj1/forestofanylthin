import { UnitStats } from '../../../types';

interface Props {
  deadUnit: UnitStats;
}

const DeadUnit = ({ deadUnit }: Props) => {
  return (
    <div className="flex flex-col items-center h-auto sm:h-[300px] w-full sm:w-[300px] text-red-500 bg-zinc-900/80 backdrop-blur-sm rounded-full justify-center border border-red-700/50">
      <h2 className="text-xl">{deadUnit.name} died!</h2>

      <img
        className="w-[200px] h-[200px] object-cover rounded-full p-1 border border-red-700/50"
        src={deadUnit.portrait}
        alt={deadUnit.name}
      />
    </div>
  );
};

export default DeadUnit;
