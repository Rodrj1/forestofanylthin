import { Skill } from '../../types';
import SkillIcon from './SkillIcon/SkillIcon';

interface Props {
  previewSkill: Skill;
  handleExitSkillPreview: () => void;
}

const SkillPreview = ({ previewSkill, handleExitSkillPreview }: Props) => {
  return (
    <div
      className={`flex flex-col gap-2 h-[280px] p-8 w-[280px] border-[5px] justify-center items-center rounded-full border-double
    ${previewSkill.type === 'Destruction' && 'bg-stone-800/80 border-red-600'}
    ${
      previewSkill.formattedName === 'Ice Spear' &&
      'bg-gray-800/80 !border-gray-500'
    }
    ${
      previewSkill.type === 'Dark Magic' &&
      'bg-purple-950/80 border-fuchsia-950'
    }
    ${
      previewSkill.type === 'Necromancy' &&
      'bg-emerald-900/80 border-stone-600'
    }

    ${
      previewSkill.type === 'Combat' &&
      'bg-zinc-900/80 border-gray-600'
    }
    `}
    >
      <SkillIcon skill={previewSkill} />

      <h3
        className={`${previewSkill.type === 'Dark Magic' && 'text-indigo-400'}
        ${previewSkill.type === 'Destruction' && 'text-orange-400'}
        ${previewSkill.formattedName === 'Ice Spear' && 'text-sky-400'}
        ${previewSkill.type === 'Necromancy' && 'text-yellow-300'}`}
      >
        {previewSkill.name}
      </h3>

      <p className="max-w-[220px] text-sm text-center whitespace-pre-wrap">
        {previewSkill.description}
      </p>

      <button onClick={handleExitSkillPreview}>
        Close
      </button>
    </div>
  );
};

export default SkillPreview;
