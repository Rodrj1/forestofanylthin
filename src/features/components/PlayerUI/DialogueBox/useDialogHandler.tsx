import { useState } from 'react';
import {
  dryeldarDialog,
  undeadDialog,
} from '../../../../data/DialogData/data';

const dialogOptions = ['On the quest', 'Velish', 'Reinforcements'];

interface Props {
  race: string;
}

export const useDialogHandler = ({ race }: Props) => {
  const [dialogText, setDialogText] = useState('');
  
  const handleDialogOptions = (dialog: string) => {
    switch (dialog) {
      case 'On the quest':
        race == 'undead'
          ? setDialogText(undeadDialog.quest)
          : setDialogText(dryeldarDialog.quest);
        break;
      case 'Velish':
        race == 'undead'
          ? setDialogText(undeadDialog.velish)
          : setDialogText(dryeldarDialog.velish);
        break;
      case 'Reinforcements':
        race == 'undead'
          ? setDialogText(undeadDialog.reinforcements)
          : setDialogText(dryeldarDialog.reinforcements);
        break;
    }
  };
  const showDialogOptions = dialogOptions.map((dialogue) => (
    <button className='w-full' key={dialogue} onClick={() => handleDialogOptions(dialogue)}>
      {dialogue}
    </button>
  ));

  return { showDialogOptions, dialogText };
};
