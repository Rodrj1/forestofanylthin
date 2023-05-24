import { useActionSound } from '../../../hooks';
import { skill } from '../../../types';

interface Props {
  skill: skill;
  handleSkillPreview?: (skill: skill) => void;
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
