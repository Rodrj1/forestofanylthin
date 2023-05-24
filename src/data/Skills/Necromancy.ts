import ngvampiriclust from "../../assets/images/skills/ngvampirism.png";
import ngreanimate from "../../assets/images/skills/ngreanimate.png";
import { Skill } from "../../types";

export const vampiricLust: Skill = {
  name: "Necromancy: Vampiric Lust",
  formattedName: "Vampiric Lust",
  description:
    "Grants the unit the ability to heal itself when dealing basic attacks. 60% of damage dealt goes back to the attacker." +
    "\n\nCost: 6 spiritual power.",
  image: ngvampiriclust,
  type: "Necromancy",
};

export const reanimate: Skill = {
  name: "Necromancy: Reanimate",
  formattedName: "Reanimate",
  description:
    "Heals any undead unit to full." + "\n\nCost: 6 spiritual power.",
  image: ngreanimate,
  type: "Necromancy",
};
