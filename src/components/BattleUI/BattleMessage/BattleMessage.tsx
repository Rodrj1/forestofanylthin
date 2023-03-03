import { useDisplayBars } from '../../../features/components/BattleUI';
import { Bar } from '../../Bar';
import { SkillIcon } from '../../SkillPreview/SkillIcon';
import BattleMessageCSS from './style.module.scss';

const BattleMessage = () => {
  const {
    playingUnit,
    targetUnit,
    battleMessageText,
    actionImage,
    isDamaging,
    isMagicUsed,
    updateMagic,
    attackerIsCursed,
    updateHealth,
    targetMaxHealth,
    attackerDamage,
  } = useDisplayBars();

  return (
    <>
      <div className={BattleMessageCSS.message}>
        <div className={BattleMessageCSS.playingUnit}>
          <img src={playingUnit?.face} />
          {isMagicUsed && (
            <span>
              <Bar
                value={updateMagic}
                maxValue={playingUnit.maxMagic}
                type="mana"
                race={targetUnit.type}
              />
            </span>
          )}
        </div>
        <div className={BattleMessageCSS.text}>
          <span>{battleMessageText.toUpperCase()}</span>
          <SkillIcon skill={actionImage} />
          {isDamaging && (
            <span className={BattleMessageCSS.damage}>
              {attackerDamage.toFixed(0)}!
            </span>
          )}
        </div>
        <div className={BattleMessageCSS.playingUnit}>
          <img src={targetUnit?.face} />
          {isDamaging && attackerIsCursed == false && (
            <span>
              <Bar
                value={updateHealth}
                maxValue={targetMaxHealth}
                type="life"
                race={targetUnit.type}
              />
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default BattleMessage;
