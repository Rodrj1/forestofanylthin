import dryexaranger from "../../../assets/images/portraits/dryexa/dryexaranger.jpg";
import dryexarangerFace from "../../../assets/images/portraits/dryexa/dryexarangerface.jpg";
import attackranger from "../../../assets/sounds/attackranger.mp3";
import hittedranger from "../../../assets/sounds/hittedranger.mp3";
import deathranger from "../../../assets/sounds/deathranger.mp3";
import { attack, clear } from "../../Skills/Combat";
import { UnitStats } from "../../../types";

const attackRanger = () => {
  new Audio(attackranger).play();
};

const hittedRanger = () => {
  new Audio(hittedranger).play();
};

const deathRanger = () => {
  new Audio(deathranger).play();
};

export const dryexaRanger: UnitStats = {
  name: "Dryexa Ranger",
  id: "Dryexa Ranger",
  type: "Dryexa",
  level: 4,
  damage: 12,
  initialArmor: 0,
  armor: 0,
  magicResistance: 0,
  health: 13,
  maxHealth: 13,
  magic: 0,
  maxMagic: 0,
  initiative: "7",
  portrait: dryexaranger,
  face: dryexarangerFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack],
  weaknessDamage: 1,
  cursed: false,
  soundAttack: attackRanger,
  soundHitted: hittedRanger,
  soundDeath: deathRanger,
  updatedDamage: 12,
  updatedHealth: 13,
};
