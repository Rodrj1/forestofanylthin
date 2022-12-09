interface skill {
  name: string;
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
  armor: number;
  magic: number;
  maxMagic: number;
  initiative: string;
  portrait: string;
  face: string;
  stack: number;
  belongsTo: string;
  skills: skill[];
  weaknessDamage: number;
  cursed: boolean;
  vampiricHeal?: boolean;
  soundAttack: () => void;
  soundHitted: () => void;
  soundDeath: () => void;
  spellpower?: number;
  level?: number;
}
