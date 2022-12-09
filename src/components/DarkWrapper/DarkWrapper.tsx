import BattleMessageCSS from "../BattleUI/BattleMessage/BattleMessage.module.scss";

interface Props {
  children: JSX.Element;
  opacity?: number;
}

const DarkWrapper = ({ children, opacity }: Props) => {
  const opacityToUse = opacity
    ? `rgba(1, 1, 1, ${opacity})`
    : "rgba(1, 1, 1, 0.459)";
  return (
    <div
      style={{ backgroundColor: opacityToUse }}
      className={BattleMessageCSS.darkBackground}
    >
      {children}
    </div>
  );
};

export default DarkWrapper;
