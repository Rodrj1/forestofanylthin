import { useDialogHandler } from '../../../features/components/PlayerUI/DialogueBox';

interface Props {
  handleVisibility: () => void;
  image: string;
  race: string;
}

const DialogueBox = ({ handleVisibility, image, race }: Props) => {
  const { showDialogOptions, dialogText } = useDialogHandler({ race });

  return (
    <div className="flex flex-col p-3 w-[95%] sm:w-[450px] gap-2 items-center justify-center bg-gradient-radial from-zinc-900 via-gray-800/80 to-zinc-900 border border-emerald-600">
      <h2 className="text-2xl text-yellow-400">Ydris</h2>

      <div className="flex flex-col xs:flex-row items-center justify-center">
        <img
          className="h-[180px] w-[180px] object-cover m-4 p-1 border border-emerald-600 rounded-full shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
          src={image && image}
          alt="image"
        />

        <div className="flex flex-wrap gap-2">{showDialogOptions}</div>
      </div>

      <p className="bg-gradient-to-l from-teal-600/50 to-teal-900/70 p-2 h-[180px] overflow-y-auto w-[100%]">
        {dialogText}
      </p>

      <button className="w-full" onClick={handleVisibility}>
        Close
      </button>
    </div>
  );
};

export default DialogueBox;
