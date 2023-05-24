import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { UnitStats } from '../../../types';
import { useSkillPreview } from '../../../features/SkillPreview';
import { SkillPreview } from '../../SkillPreview';
import damage from '../../../assets/images/stats/damage.png';
import armor from '../../../assets/images/stats/armor.png';
import hourglass from '../../../assets/images/stats/hourglass.png';
import health from '../../../assets/images/stats/health.png';
import SkillIcon from '../../SkillPreview/SkillIcon/SkillIcon';

interface Props {
  previewUnit: UnitStats;
  handleExitUnitPreview: () => void;
}

const UnitPreview = ({ previewUnit, handleExitUnitPreview }: Props) => {
  const { previewSkill, handleSkillPreview, handleExitSkillPreview } =
    useSkillPreview();

  return (
    <div
      className="flex flex-col items-center justify-center h-auto w-[95%] sm:w-max bg-zinc-900/80
     border-[6px] border-double 
    border-violet-900/70 absolute text-sm p-4 gap-9"
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src={previewUnit.face}
          alt={previewUnit.name}
          className="object-cover h-[140px] w-[140px] rounded-full border border-zinc-600 p-1"
        />

        <h2 className="text-lg text-center">
          {previewUnit.name}
          {previewUnit.type != 'Hero' && ` - Level ${previewUnit.level}`}
        </h2>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <img src={health} alt="health" className={"statStyle"} />
          <span>Health: {previewUnit.health}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={hourglass} alt="initiative" className={"statStyle"} />
          <span>Initiative: {previewUnit.initiative}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={damage} alt="attack" className={"statStyle"} />
          <span>Attack: {previewUnit.damage}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <img src={armor} alt="armor" className={"statStyle"} />
          <span>Armor: {previewUnit.armor}</span>
        </div>
      </div>

      <div className="flex gap-3 items-center flex-wrap justify-center">
        {previewUnit.skills.map((skill) => {
          if (skill.formattedName != 'Clear Action')
            return (
              <div key={skill.name} className="flex flex-col justify-center items-center">
                <SkillIcon
                  skill={skill}
                  handleSkillPreview={handleSkillPreview}
                />
                <p>{skill.formattedName}</p>
              </div>
            );
        })}
      </div>

      {previewSkill != '' && (
        <DarkBackgroundWrapper>
          <SkillPreview
            handleExitSkillPreview={handleExitSkillPreview}
            previewSkill={previewSkill}
          />
        </DarkBackgroundWrapper>
      )}

      <button onClick={handleExitUnitPreview}>Close</button>
    </div>
  );
};
export default UnitPreview;
