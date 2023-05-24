import cbattack from '../../assets/images/skills/cbattack.png';
import cbclear from '../../assets/images/skills/clear.png';
import { Skill } from '../../types';

export const clear: Skill = {
  name: 'Combat: Clear Action',
  formattedName: 'Clear Action',
  description:
    "Clears the current selected action. It allows to preview enemy units' stats.",
  image: cbclear,
  type: 'Combat',
};

export const attack: Skill = {
  name: 'Combat: Attack',
  formattedName: 'Attack',
  description: 'Basic attack.',
  image: cbattack,
  type: 'Combat',
};
