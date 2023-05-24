import { useDisplayBars } from '../../../features/components/BattleUI';
import { Bar } from '../../Bar';
import { SkillIcon } from '../../SkillPreview/SkillIcon';

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
    <div className="flex min-h-[200px] max-w-[900px] items-center justify-center bg-zinc-900/80 backdrop-blur-lg border-[6px] border-double rounded-md border-violet-900/70 p-2 gap-3">
      <div className="flex flex-col">
        <img
          className="h-[130px] w-[130px] p-1 border border-zinc-700 rounded-full object-cover"
          src={playingUnit?.face}
        />

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

      <div className="flex flex-col justify-center items-center">
        <span className="text-sm">{battleMessageText.toUpperCase()}</span>

        <SkillIcon skill={actionImage} />

        {isDamaging && (
          <span className="text-red-600 font-bold">
            {attackerDamage.toFixed(0)}!
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <img
          className="h-[130px] w-[130px] p-1 border border-zinc-700 rounded-full object-cover"
          src={targetUnit?.face}
        />

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
  );
};

export default BattleMessage;
