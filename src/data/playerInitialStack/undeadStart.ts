import {
  lich,
  nicolaiSilorn,
  skeleton,
  undeadWarlock,
} from "../unitstats/undead/undead";

export const playerUndead = [
  {
    ...nicolaiSilorn,
    belongsTo: "player",
    updatedHealth: nicolaiSilorn.health,
    updatedDamage: nicolaiSilorn.damage,
    maxStack: 1,
  },
  {
    ...skeleton,
    stack: 12,
    belongsTo: "player",
    updatedHealth: skeleton.health * 12,
    updatedDamage: skeleton.damage * 12,
    maxStack: 12,
    maxHealth: skeleton.health * 12,
    id: "nicolaiSkeleton"
  },
  {
    ...undeadWarlock,
    stack: 4,
    belongsTo: "player",
    updatedHealth: undeadWarlock.health * 4,
    updatedDamage: undeadWarlock.damage * 4,
    maxStack: 4,
    maxHealth: undeadWarlock.health * 4,
    id: "nicolaiWarlock"
  },
  {
    ...lich,
    stack: 2,
    belongsTo: "player",
    updatedHealth: lich.health * 2,
    updatedDamage: lich.damage * 2,
    maxStack: 2,
    maxHealth: lich.health * 2,
    id: "nicolaiLich"
  },
];
