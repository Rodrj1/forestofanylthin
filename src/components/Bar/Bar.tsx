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
    <div className={BarCSS.container}>
      {maxValue > 0 ? (
        <>
          <div
            className={BarCSS.barStyle}
            style={{
              width: `${(value / maxValue) * 100}%`,
              background: type == 'mana' ? '#7dcfff' : `${barColor}`,
            }}
          ></div>
          <span>
            {value.toFixed(1)} / {maxValue.toFixed(1)}{' '}
            {type == 'mana' ? 'SP' : 'HP'}
          </span>
        </>
      ) : (
        <>
          <div
            className={BarCSS.barStyle}
            style={{
              width: `${(value / maxValue) * 100}%`,
              backgroundColor: `hsl(80, 90%, 100%)`,
            }}
          ></div>
          <span>
            {0} / {0}
          </span>
        </>
      )}
    </div>
  );
};

export default Bar;
