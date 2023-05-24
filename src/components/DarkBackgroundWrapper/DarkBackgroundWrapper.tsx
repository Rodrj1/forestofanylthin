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
      className="flex bg-black absolute min-h-screen w-screen z-[10000] justify-center items-center m-0 top-0 h-[210vh] xs:h-[120vh] sm:h-[105vh]"
    >
      {children}
    </div>
  );
};

export default DarkBackgroundWrapper;