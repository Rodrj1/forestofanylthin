import { attack, clear } from "../../Skills/Combat";
import { curse, shatterArmor, weakness } from "../../Skills/DarkMagic";
import { rainOfFire } from "../../Skills/Destruction";
import elisithPortrait from "../../../assets/images/portraits/dryeldar/elisith.jpg";
import elisithFace from "../../../assets/images/portraits/dryeldar/elisithface.jpg";
import darkMatronPortrait from "../../../assets/images/portraits/dryeldar/darkmatron2.jpg";
import darkMatronFace from "../../../assets/images/portraits/dryeldar/darkmatron2face.jpg";
import twistedJinPortrait from "../../../assets/images/portraits/dryeldar/twistedjin.jpg";
import twistedJinFace from "../../../assets/images/portraits/dryeldar/twistedjinface.jpg";
import enslavedroynisPortrait from "../../../assets/images/portraits/dryeldar/enslavedroynis.jpg";
import enslavedroynisFace from "../../../assets/images/portraits/dryeldar/enslavedroynisface.jpg";
import attacksword from "../../../assets/sounds/attackroynis.mp3";
import attacktwistedjin from "../../../assets/sounds/attacktwistedjin.mp3";
import attackdarkmatron from "../../../assets/sounds/attackdarkmatron.mp3";
import attackelisith from "../../../assets/sounds/attackelisith.mp3";
import hittedroynis from "../../../assets/sounds/hittedroynis.mp3";
import hittedtwistedjin from "../../../assets/sounds/hittedtwistedjin.mp3";
import hitteddarkmatron from "../../../assets/sounds/hitteddarkmatron.mp3";
import hittedelisith from "../../../assets/sounds/hittedelisith.mp3";
import deathtwistedjin from "../../../assets/sounds/deathtwistedjin.mp3";
import deathdarkmatron from "../../../assets/sounds/deathdarkmatron.mp3";
import deathroynis from "../../../assets/sounds/deathroynis.mp3";

const attackSword = () => {
  new Audio(attacksword).play();
};

const attackTwistedJin = () => {
  new Audio(attacktwistedjin).play();
};

const attackDarkMatron = () => {
  new Audio(attackdarkmatron).play();
};

const attackElisith = () => {
  new Audio(attackelisith).play();
};

const hittedRoynis = () => {
  new Audio(hittedroynis).play();
};

const hittedTwistedJin = () => {
  new Audio(hittedtwistedjin).play();
};

const hittedDarkMatron = () => {
  new Audio(hitteddarkmatron).play();
};

const hittedElisith = () => {
  new Audio(hittedelisith).play();
};

const deathTwistedJin = () => {
  new Audio(deathtwistedjin).play();
};

const deathDarkMatron = () => {
  new Audio(deathdarkmatron).play();
};

const deathRoynis = () => {
  new Audio(deathroynis).play();
};

export const elisith = {
  name: "Elisith",
  id: "Elisith",
  type: "Hero",
  damage: 56,
  armor: 5,
  health: 145,
  maxHealth: 145,
  magic: 10,
  maxMagic: 10,
  initiative: "5",
  spellpower: 5,
  portrait: elisithPortrait,
  face: elisithFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, curse, rainOfFire],
  weaknessDamage: 1,
  cursed: false,
  soundAttack: attackElisith,
  soundHitted: hittedElisith,
  soundDeath: deathRoynis,
};

export const enslavedRoynis = {
  name: "Enslaved Roynis",
  id: "Enslaved Roynis",
  type: "Dryeldar",
  level: 1,
  damage: 7,
  armor: 1,
  health: 8,
  maxHealth: 8,
  magic: 0,
  maxMagic: 0,
  initiative: "4",
  portrait: enslavedroynisPortrait,
  face: enslavedroynisFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack],
  weaknessDamage: 1,
  cursed: false,
  soundAttack: attackSword,
  soundHitted: hittedRoynis,
  soundDeath: deathRoynis,
};

export const twistedJin = {
  name: "Twisted Jin",
  id: "Twisted Jin",
  type: "Dryeldar",
  level: 4,
  damage: 21,
  armor: 2,
  health: 25,
  maxHealth: 25,
  magic: 4,
  maxMagic: 4,
  initiative: "6",
  portrait: twistedJinPortrait,
  face: twistedJinFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, weakness, curse],
  weaknessDamage: 1,
  cursed: false,
  soundAttack: attackTwistedJin,
  soundHitted: hittedTwistedJin,
  soundDeath: deathTwistedJin,
};

export const darkMatron = {
  name: "Dark Matron",
  id: "Dark Matron",
  type: "Dryeldar",
  level: 6,
  damage: 29,
  armor: 5,
  health: 50,
  maxHealth: 50,
  magic: 6,
  maxMagic: 6,
  initiative: "5",
  portrait: darkMatronPortrait,
  face: darkMatronFace,
  stack: 1,
  maxStack: 1,
  belongsTo: "",
  skills: [clear, attack, shatterArmor],
  weaknessDamage: 1,
  cursed: false,
  soundAttack: attackDarkMatron,
  soundHitted: hittedDarkMatron,
  soundDeath: deathDarkMatron,
};
