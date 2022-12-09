import {
  darkMatron,
  elisith,
  enslavedRoynis,
  twistedJin,
} from "../unitstats/dryeldar/dryeldar";

export const playerDryeldar = [
  {
    ...elisith,
    belongsTo: "player",
    updatedHealth: elisith.health,
    updatedDamage: elisith.damage,
    maxStack: 1,
  },
  {
    ...enslavedRoynis,
    stack: 13,
    belongsTo: "player",
    updatedHealth: enslavedRoynis.health * 13,
    updatedDamage: enslavedRoynis.damage * 13,
    maxStack: 13,
    maxHealth: enslavedRoynis.health * 13,
  },
  {
    ...twistedJin,
    stack: 6,
    belongsTo: "player",
    updatedHealth: twistedJin.health * 6,
    updatedDamage: twistedJin.damage * 6,
    maxStack: 6,
    maxHealth: twistedJin.health * 6,
  },
  {
    ...darkMatron,
    stack: 3,
    belongsTo: "player",
    updatedHealth: darkMatron.health * 3,
    updatedDamage: darkMatron.damage * 3,
    maxHealth: darkMatron.health * 3,
    maxStack: 3,
  },
];
