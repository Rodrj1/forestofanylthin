interface Props {
  text: string;
}

const WinOrDefeat = ({ text  }: Props) => {
  return (
      <h1 style={{ fontSize: "3rem" }}>{text}</h1>
  );
};

export default WinOrDefeat;
