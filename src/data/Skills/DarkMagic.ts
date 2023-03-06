import dmcurse from '../../assets/images/skills/dmcurse.png';
import dmweakness from '../../assets/images/skills/dmweakness.png';
import dmshatterarmor from '../../assets/images/skills/dmshatterarmor.png';
import dmbreachresistances from '../../assets/images/skills/dmbreachresistances.png';

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
    'Reduces damage permanently.' +
    '\n\nReduced damage if casted by a hero is 30% + (7% * spellpower)' +
    '\n\nReduced damage if casted by a normal unit is 20% + (3% * stack) + (5% * level)' +
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

export const breachResistances = {
  name: 'Dark Magic: Breach Resistances',
  formattedName: 'Breach Resistances',
  description:
    'Makes an enemy suffer 40% extra magic damage.' +
    '\n\nCost: 3 spiritual power.',
  image: dmbreachresistances,
  type: 'Dark Magic',
};
