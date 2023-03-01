import { useDialogHandler } from '../../../features/components/PlayerUI/DialogueBox';

interface Props {
  handleVisibility: () => void;
  image: string;
  race: string;
}

const DialogueBox = ({ handleVisibility, image, race }: Props) => {
  const { showDialogOptions, dialogText } = useDialogHandler({ race });

  return (
    <>
      <h2>Ydris</h2>
      <img src={image && image} alt="image" />
      {showDialogOptions}
      <p>{dialogText}</p>
      <button onClick={handleVisibility}>CLOSE</button>
    </>
  );
};

export default DialogueBox;
