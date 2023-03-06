import spellcurse from '../assets/sounds/spellcurse.mp3';
import spellweakness from '../assets/sounds/spellweakness.mp3';
import spellshatterarmor from '../assets/sounds/spellshatterarmor.mp3';
import spellrainoffire from '../assets/sounds/spellrainoffire.mp3';
import spellicespear from '../assets/sounds/spellicespear.mp3';
import spellbreachresistances from '../assets/sounds/spellbreachresistance.mp3';
import spellreanimate from '../assets/sounds/spellreanimate.mp3';
import spellvampirism from '../assets/sounds/spellvampirism.mp3';
import previewclick from '../assets/sounds/previewclick.mp3';
import useSound from 'use-sound';

export const useActionSound = () => {
  const [curseSound] = useSound(spellcurse, {
    volume: 1,
  });
  const [weaknessSound] = useSound(spellweakness, {
    volume: 1,
  });

  const [shatterArmorSound] = useSound(spellshatterarmor, {
    volume: 1,
  });

  const [rainOfFireSound] = useSound(spellrainoffire, {
    volume: 1,
  });

  const [iceSpearSound] = useSound(spellicespear, {
    volume: 1,
  });

  const [breachResistances] = useSound(spellbreachresistances, {
    volume: 1,
  });

  const [reanimateSound] = useSound(spellreanimate, {
    volume: 1,
  });

  const [vampiricLustSound] = useSound(spellvampirism, {
    volume: 1,
  });

  const [previewSound] = useSound(previewclick, {
    volume: 1,
  });

  const playCurse = () => {
    curseSound();
  };

  const playWeakness = () => {
    weaknessSound();
  };

  const playShatterArmor = () => {
    shatterArmorSound();
  };

  const playRainOfFire = () => {
    rainOfFireSound();
  };

  const playIceSpear = () => {
    iceSpearSound();
  };

  const playBreachResistances = () => {
    breachResistances();
  };

  const playReanimate = () => {
    reanimateSound();
  };

  const playVampiricLust = () => {
    vampiricLustSound();
  };

  const playPreviewSound = () => {
    previewSound();
  };

  const spellSounds = {
    curse: playCurse,
    weakness: playWeakness,
    shatterArmor: playShatterArmor,
    rainOfFire: playRainOfFire,
    reanimate: playReanimate,
    vampiricLust: playVampiricLust,
    iceSpear: playIceSpear,
    breachResistances: playBreachResistances,
  };

  return {
    spellSounds,
    playPreviewSound,
  };
};
