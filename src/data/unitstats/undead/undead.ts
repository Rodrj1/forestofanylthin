import skeletonPortrait from "../../../assets/images/portraits/undead/skeleton.jpg";
import skeletonFace from "../../../assets/images/portraits/undead/skeletonface.jpg";
import warlockPortrait from "../../../assets/images/portraits/undead/warlock.jpg";
import warlockFace from "../../../assets/images/portraits/undead/warlockface.jpg";
import lichPortrait from "../../../assets/images/portraits/undead/lich.jpg";
import lichFace from "../../../assets/images/portraits/undead/lichface.jpg";
import nicolaiPortrait from "../../../assets/images/portraits/undead/nicolaisilorn.jpg";
import nicolaiFace from "../../../assets/images/portraits/undead/nicolaisilornface.jpg";
import lorgrenPortrait from "../../../assets/images/portraits/undead/lorgren.jpg";
import lorgrenFace from "../../../assets/images/portraits/undead/lorgrenface.jpg";
import velishPortrait from "../../../assets/images/portraits/undead/velishacarys.jpg";
import velishFace from "../../../assets/images/portraits/undead/velishacarysface.jpg";
import { curse, weakness } from "../../Skills/DarkMagic";
import { attack, clear } from "../../Skills/Combat";
import attacklich from "../../../assets/sounds/attacklich.mp3";
import attackvelish from "../../../assets/sounds/attackvelish.mp3";
import attacknicolai from "../../../assets/sounds/attacknicolai.mp3";
import attacksword from "../../../assets/sounds/attackroynis.mp3";
import attackundeadwarlock from "../../../assets/sounds/attackundeadwarlock.mp3";
import hittedlich from "../../../assets/sounds/hittedlich.mp3";
import hittedskeleton from "../../../assets/sounds/hittedskeleton.mp3";
import hittedundeadwarlock from "../../../assets/sounds/hittedundeadwarlock.mp3";
import hittednicolai from "../../../assets/sounds/hittednicolai.mp3";
import hittedvelish from "../../../assets/sounds/hittedvelish.mp3";
import deathskeleton from "../../../assets/sounds/deathskeleton.mp3";
import deathlich from "../../../assets/sounds/deathlich.mp3";
import deathundeadwarlock from "../../../assets/sounds/deathundeadwarlock.mp3";
import deathvelish from "../../../assets/sounds/deathvelish.mp3";
import deathnicolai from "../../../assets/sounds/deathnicolai.mp3";
import { reanimate, vampiricLust } from "../../Skills/Necromancy";

const attackSword = () => {
  new Audio(attacksword).play();
};

const attackLich = () => {
  new Audio(attacklich).play();
};

const attackVelish = () => {
  new Audio(attackvelish).play();
};

const attackNicolai = () => {
  new Audio(attacknicolai).play();
};

const attackUndeadWarlock = () => {
  new Audio(attackundeadwarlock).play();
};

const hittedLich = () => {
  new Audio(hittedlich).play();
};

const hittedSkeleton = () => {
  new Audio(hittedskeleton).play();
};

const hittedWarlock = () => {
  new Audio(hittedundeadwarlock).play();
};

const hittedNicolai = () => {
  new Audio(hittednicolai).play();
};

const hittedVelish = () => {
  new Audio(hittedvelish).play();
};

const deathVelish = () => {
  new Audio(deathvelish).play();
};

const deathNicolai = () => {
  new Audio(deathnicolai).play();
};

const deathLich = () => {
  new Audio(deathlich).play();
};

const deathSkeleton = () => {
  new Audio(deathskeleton).play();
};

const deathUndeadWarlock = () => {
  new Audio(deathundeadwarlock).play();
};

export const nicolaiSilorn = {
  name: "Nicolai of Silorn",
  id: "Nicolai",
  type: "Hero",
  damage: 45,
  armor: 6,
  health: 210,
  maxHealth: 210,
  magic: 12,
  maxMagic: 12,
  initiative: "8",
  spellpower: 4,
  portrait: nicolaiPortrait,
  face: nicolaiFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, vampiricLust, reanimate],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
  soundAttack: attackNicolai,
  soundHitted: hittedNicolai,
  soundDeath: deathNicolai,
};

export const lorgrenMalkur = {
  name: "Lorgren Malkur",
  id: "Lorgren",
  type: "Hero",
  damage: 25,
  armor: 4,
  health: 120,
  maxHealth: 120,
  magic: 60,
  maxMagic: 60,
  initiative: "8",
  spellpower: 6,
  portrait: lorgrenPortrait,
  face: lorgrenFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, curse],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
};

export const velishAcarys = {
  name: "Velish Acarys",
  id: "Velish Acarys",
  type: "Hero",
  damage: 41,
  armor: 2,
  health: 175,
  maxHealth: 175,
  magic: 12,
  maxMagic: 12,
  initiative: "5",
  spellpower: 7,
  portrait: velishPortrait,
  face: velishFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, curse],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
  soundAttack: attackVelish,
  soundHitted: hittedVelish,
  soundDeath: deathVelish,
};

export const skeleton = {
  name: "Skeleton",
  id: "Skeleton",
  type: "Undead",
  level: 1,
  damage: 3,
  armor: 0,
  health: 6,
  maxHealth: 6,
  magic: 0,
  maxMagic: 0,
  initiative: "2",
  portrait: skeletonPortrait,
  face: skeletonFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
  soundAttack: attackSword,
  soundHitted: hittedSkeleton,
  soundDeath: deathSkeleton,
};

export const undeadWarlock = {
  name: "Undead Warlock",
  id: "Undead Warlock",
  type: "Undead",
  level: 3,
  damage: 12,
  armor: 1,
  health: 16,
  maxHealth: 16,
  magic: 4,
  maxMagic: 4,
  initiative: "1",
  portrait: warlockPortrait,
  face: warlockFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, curse],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
  soundAttack: attackUndeadWarlock,
  soundHitted: hittedWarlock,
  soundDeath: deathUndeadWarlock,
};

export const lich = {
  name: "Lich",
  id: "Lich",
  type: "Undead",
  level: 5,
  damage: 27,
  armor: 4,
  health: 33,
  maxHealth: 33,
  magic: 8,
  maxMagic: 8,
  initiative: "6",
  portrait: lichPortrait,
  face: lichFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, curse, weakness],
  weaknessDamage: 1,
  cursed: false,
  vampiricHeal: false,
  soundAttack: attackLich,
  soundHitted: hittedLich,
  soundDeath: deathLich,
};
