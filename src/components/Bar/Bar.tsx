import BarCSS from './Bar.module.scss';

interface Props {
  value: number;
  maxValue: number;
  type: string;
  race: string;
}

const Bar = ({ value, maxValue, type, race }: Props) => {
  let barColor = '';
  switch (race) {
    case 'Dryeldar':
      barColor = '#ff9e64';
      break;
    case 'Undead':
      barColor = '#9ece6a';
      break;
    case 'Hero':
      barColor = '#bb9af7';
      break;
    case 'Dryexa':
      barColor = '#f7768e';
      break;
  }

  return (
    <div className="flex items-center text-sm w-full m-auto sm:w-[80%] h-[19px] bg-slate-100 border-2 border-slate-700 relative z-50 rounded-xl text-black">
      {maxValue > 0 ? (
        <>
          <div
            className="rounded-xl h-[15px] absolute -z-20"
            style={{
              width: `${(value / maxValue) * 100}%`,
              background: type == 'mana' ? '#7dcfff' : `${barColor}`,
            }}
          />

          <span className="w-full h-full text-center">
            {value.toFixed(1)} / {maxValue.toFixed(1)}{' '}
            {type == 'mana' ? 'SP' : 'HP'}
          </span>
        </>
      ) : (
        <>
          <div
            className="rounded-xl h-[15px] absolute -z-20"
            style={{
              width: `${(value / maxValue) * 100}%`,
              backgroundColor: `hsl(80, 90%, 100%)`,
            }}
          />

          <span className="w-full h-full text-center">
            {0} / {0}
          </span>
        </>
      )}
    </div>
  );
};

export default Bar;
