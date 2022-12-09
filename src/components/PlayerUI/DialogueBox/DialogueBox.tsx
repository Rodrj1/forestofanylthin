import { useState } from "react";
import { undeadDialog } from "../../../data/DialogData/DialogData";
import { dryeldarDialog } from "../../../data/DialogData/DialogData";

const dialogOptions = ["On the quest", "Velish", "Reinforcements"];

interface Props {
  handleVisibility: () => void;
  image: string;
  race: string;
}

const DialogueBox = ({ handleVisibility, image, race }: Props) => {
  const [dialogText, setDialogText] = useState("");
  const handleDialogOptions = (dialog: string) => {
    switch (dialog) {
      case "On the quest":
        race == "undead"
          ? setDialogText(undeadDialog.quest)
          : setDialogText(dryeldarDialog.quest);
        break;
      case "Velish":
        race == "undead"
          ? setDialogText(undeadDialog.velish)
          : setDialogText(dryeldarDialog.velish);
        break;
      case "Reinforcements":
        race == "undead"
          ? setDialogText(undeadDialog.reinforcements)
          : setDialogText(dryeldarDialog.reinforcements);
        break;
    }
  };
  const showDialogOptions = dialogOptions.map((dialogue) => (
    <button key={dialogue} onClick={() => handleDialogOptions(dialogue)}>
      {dialogue}
    </button>
  ));
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
