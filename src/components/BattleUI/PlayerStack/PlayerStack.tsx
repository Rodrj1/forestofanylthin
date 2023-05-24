import { useContext, useEffect, useState } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { useArmyUpdater } from '../../../hooks/useArmyUpdater';
import { useActionSound } from '../../../hooks';
import { useSkillPreview } from '../../../features/SkillPreview';
import { SkillIcon } from '../../SkillPreview/SkillIcon';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { SkillPreview } from '../../SkillPreview';
import { ActionName } from '../../../types';

interface Props {
  playerKey: number;
  setPlayerKey: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerStack = ({ playerKey, setPlayerKey }: Props) => {
  const { previewSkill, handleSkillPreview, handleExitSkillPreview } =
    useSkillPreview();

  const { setAction, unitsInBoard, enemyArmy, playerArmy, unitPosition } =
    useContext(BattleContext);

  const { showArmy } = useArmyUpdater({
    army: playerArmy,
    key: playerKey,
    setKey: setPlayerKey,
  });

  const { playPreviewSound } = useActionSound();

  const [actionImage, setActionImage] = useState<string>();

  const handleAction = (playerAction: ActionName, skillImage: string) => {
    setActionImage(skillImage);
    playPreviewSound();
    if (playerAction != 'Combat: Clear Action') {
      if (unitsInBoard[unitPosition].belongsTo == 'player')
        setAction(playerAction);
    } else setAction('Combat: Clear Action');
  };

  useEffect(() => {
    setActionImage('');
  }, [playerArmy, enemyArmy]);

  return (
    <>
      <div className="flex gap-10 w-full overflow-x-auto overflow-y-hidden justify-start md:justify-center">
        {showArmy}
      </div>

      <div className="flex gap-7 items-center justify-start md:justify-center w-full overflow-x-auto">
        {actionImage != '' && <img className="w-12 h-12" src={actionImage} />}

        {unitsInBoard[unitPosition]?.skills.map((skill) => (
          <div
            className="flex flex-col items-center justify-center gap-2 text-sm "
            key={skill.name}
          >
            <SkillIcon skill={skill} handleSkillPreview={handleSkillPreview} />

            <button
              className={`w-max bg-transparent border-transparent border-t-2 focus:border-emerald-300 focus:border-t hover:border
              ${
                skill.type === 'Destruction' &&
                'text-orange-600 hover:border-orange-600'
              }
              ${skill.type === 'Combat' && 'text-red-100 hover:border-red-600'}
              ${
                skill.type === 'Dark Magic' &&
                'text-purple-500 hover:border-purple-500'
              }
              ${
                skill.type === 'Necromancy' &&
                'text-yellow-300 hover:border-yellow-300'
              }
              ${
                skill.formattedName === 'Ice Spear' &&
                'text-sky-500 hover:border-sky-500'
              }`}
              onClick={() => handleAction(skill.name, skill.image)}
            >
              {skill.formattedName}
            </button>
          </div>
        ))}
      </div>

      {previewSkill != '' && (
        <DarkBackgroundWrapper>
          <SkillPreview
            handleExitSkillPreview={handleExitSkillPreview}
            previewSkill={previewSkill}
          />
        </DarkBackgroundWrapper>
      )}
    </>
  );
};

export default PlayerStack;
