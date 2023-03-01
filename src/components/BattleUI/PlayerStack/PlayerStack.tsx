import { useContext, useEffect, useState } from 'react';
import { BattleContext } from '../../../context/BattleContext';
import { useArmyUpdater } from '../../../hooks/useArmyUpdater';
import { useActionSound } from '../../../hooks';
import { useSkillPreview } from '../../../features/SkillPreview';
import { SkillIcon } from '../../SkillPreview/SkillIcon';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { SkillPreview } from '../../SkillPreview';

interface Props {
  playerKey: number;
  setPlayerKey: React.Dispatch<React.SetStateAction<number>>;
  BattleCSS: CSSModuleClasses;
}

const PlayerStack = ({ playerKey, setPlayerKey, BattleCSS }: Props) => {
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

  const handleAction = (playerAction: string, skillImage: string) => {
    setActionImage(skillImage);
    playPreviewSound();
    if (playerAction != 'Combat: Clear Action') {
      if (unitsInBoard[unitPosition].belongsTo == 'player')
        setAction(playerAction);
    } else setAction('');
  };

  useEffect(() => {
    setActionImage('');
  }, [playerArmy, enemyArmy]);

  return (
    <>
      <div className={BattleCSS.army}>{showArmy}</div>

      <div className={BattleCSS.playerSkills}>
        {actionImage != '' && (
          <div className={BattleCSS.action}>
            <h3>Action:</h3>
            <img src={actionImage} />
          </div>
        )}

        {unitsInBoard[unitPosition]?.skills.map((skill) => (
          <div className={BattleCSS.skill} key={skill.name}>
            <SkillIcon skill={skill} handleSkillPreview={handleSkillPreview} />
            <button
              key={skill.name}
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
