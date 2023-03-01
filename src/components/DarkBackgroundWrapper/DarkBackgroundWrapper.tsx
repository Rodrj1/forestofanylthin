import BGCSS from "./style.module.scss";

interface Props {
  children: JSX.Element;
  opacity?: number;
}

const DarkBackgroundWrapper = ({ children, opacity }: Props) => {
  
  const opacityToUse = opacity
    ? `rgba(1, 1, 1, ${opacity})`
    : "rgba(1, 1, 1, 0.459)";

  return (
    <div
      style={{ backgroundColor: opacityToUse }}
      className={BGCSS.background}
    >
      {children}
    </div>
  );
};

export default DarkBackgroundWrapper;
