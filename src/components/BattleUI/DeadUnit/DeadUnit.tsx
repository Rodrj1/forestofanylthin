import { UnitStats } from '../../../types';

interface Props {
  deadUnit: UnitStats;
}

const DeadUnit = ({ deadUnit }: Props) => {
  return (
    <div
      className="flex flex-col items-center h-auto sm:h-[300px] w-full sm:w-[300px] bg-zinc-900/80
    border-[6px] border-double 
   border-violet-900/70 rounded-full justify-center"
    >
      <h2 className="text-xl text-red-500">{deadUnit.name} died!</h2>

      <img
        className="w-[200px] h-[200px] object-cover rounded-full p-1 border border-violet-900/70 object-top"
        src={deadUnit.portrait}
        alt={deadUnit.name}
      />
    </div>
  );
};

export default DeadUnit;
