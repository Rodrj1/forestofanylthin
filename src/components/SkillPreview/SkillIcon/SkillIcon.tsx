import { useActionSound } from '../../../hooks';
import { Skill } from '../../../types';

interface Props {
  skill: Skill;
  handleSkillPreview?: (skill: Skill) => void;
}

const SkillIcon = ({ skill, handleSkillPreview }: Props) => {
  const { playPreviewSound } = useActionSound();

  const fireSkillPreviewHandler = () => {
    if (handleSkillPreview) {
      playPreviewSound();
      handleSkillPreview(skill);
    }
  };

  return (
    <div className="h-12 w-12 cursor-pointer">
      <img
        src={skill.image}
        alt={skill.name}
        onClick={fireSkillPreviewHandler}
      />
    </div>
  );
};

export default SkillIcon;
