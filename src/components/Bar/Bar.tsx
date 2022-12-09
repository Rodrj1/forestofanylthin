import BarCSS from "./Bar.module.scss";

interface Props {
  value: number;
  maxValue: number;
  type: string;
}

const Bar = ({ value, maxValue, type }: Props) => {
  return (
    <div className={BarCSS.barContainer}>
      {maxValue > 0 ? (
        <>
          <div
            className={BarCSS.barStyle}
            style={{
              width: `${(value / maxValue) * 100}%`,
              background:
                type == "mana"
                  ? "linear-gradient(to left, #8769f5, #401fb6)"
                  : "linear-gradient(to left, #ec1505, #e95b56)",
            }}
          ></div>
          <span>
            {(Math.round(value))} / {maxValue}
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
