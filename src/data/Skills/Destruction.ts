import destructionrainoffire from '../../assets/images/skills/destructionfirerain.png';

import destructionicespear from '../../assets/images/skills/destructionicespear.png';
import { Skill } from '../../types';

export const rainOfFire: Skill = {
  name: 'Destruction: Rain of Fire',
  formattedName: 'Rain of Fire',
  description:
    'Damages all units in the enemy army dealing 55 to each one.' +
    '\n\nCost: 10 spiritual power.',
  image: destructionrainoffire,
  type: 'Destruction',
};

export const iceSpear: Skill = {
  name: 'Destruction: Ice Spear',
  formattedName: 'Ice Spear',
  description: 'Deals 95 unblockable damage.' + '\n\nCost: 7 spiritual power.',
  image: destructionicespear,
  type: 'Destruction',
};
