import dmcurse from '../../assets/images/skills/dmcurse.png';
import dmweakness from '../../assets/images/skills/dmweakness.png';
import dmshatterarmor from '../../assets/images/skills/dmshatterarmor.png';

export const curse = {
  name: 'Dark Magic: Curse',
  formattedName: 'Curse',
  description:
    'Curses a unit which reduces all damage from that unit for one turn to 0.' +
    '\n\nCost: 4 spiritual power.',
  image: dmcurse,
  type: 'Dark Magic',
};

export const weakness = {
  name: 'Dark Magic: Weakness',
  formattedName: 'Weakness',
  description:
    'Halvens 50% of the selected unit damage. It is affected by the size of the stack, or, if it is a hero, by the spellpower.' +
    '\n\nCost: 2 spiritual power.',
  image: dmweakness,
  type: 'Dark Magic',
};

export const shatterArmor = {
  name: 'Dark Magic: Shatter Armor',
  formattedName: 'Shatter Armor',
  description:
    'Each point in armor represents 10% of damage reduction. It destroys the armor of the targeted unit. ' +
    '\n\nReduced armor if casted by a hero is equal to 1 + 1 * Spellpower.' +
    '\n\nReduced armor if casted by a normal unit is  1 + (0.7 * stack) + (level / 2).' +
    '\n\nCost: 3 spiritual power.',
  image: dmshatterarmor,
  type: 'Dark Magic',
};
