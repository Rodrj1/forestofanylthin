export type ActionName =
  | 'Combat: Clear Action'
  | 'Combat: Attack'
  | 'Dark Magic: Curse'
  | 'Dark Magic: Weakness'
  | 'Dark Magic: Shatter Armor'
  | 'Dark Magic: Breach Resistances'
  | 'Destruction: Rain of Fire'
  | 'Destruction: Ice Spear'
  | 'Necromancy: Reanimate'
  | 'Necromancy: Vampiric Lust';

interface Skill {
  name: ActionName;
  formattedName: string;
  description: string;
  image: string;
  type: string;
}

export interface UnitStats {
  id: string;
  name: string;
  type: string;
  stack: number;
  maxStack: number;
  health: number;
  maxHealth: number;
  updatedHealth: number;
  updatedDamage: number;
  damage: number;
  initialArmor: number;
  armor: number;
  magicResistance: number;
  magic: number;
  maxMagic: number;
  initiative: string;
  portrait: string;
  face: string;
  stack: number;
  belongsTo: string;
  skills: Skill[];
  weaknessDamage: number;
  cursed: boolean;
  soundAttack: () => void;
  soundHitted: () => void;
  soundDeath: () => void;
  vampiricHeal?: boolean;
  spellpower?: number;
  level?: number;
}

export type Army = UnitStats[];
export type Unit = UnitStats;
