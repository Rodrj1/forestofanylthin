import { Army } from '../../types';
import { useUnitPreview } from '../../features/UnitPreview/useUnitPreview';
import { DarkBackgroundWrapper } from '../DarkBackgroundWrapper';
import UnitPreview from '../PlayerUI/UnitPreview/UnitPreview';

interface Props {
  previewLevel: Army;
  handleVisibility: () => void;
}

const ZonePreview = ({ previewLevel, handleVisibility }: Props) => {
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  return (
    <>
      <DarkBackgroundWrapper>
        <div className="bg-zinc-900/80 border-[6px] border-double border-violet-900/70 flex flex-col gap-2 p-3 w-[95%] sm:w-[500px] items-center">
          <h2>Scouting reveals:</h2>

          <div className="flex flex-wrap gap-3 justify-center border-t-4 border-b-4 border-dotted border-violet-900/70 px-2 pt-4">
            {previewLevel?.map((unit) => (
              <div className="h-[150px] w-[100px] relative" key={unit.id}>
                <img
                  className="w-[100px] h-[100px] cursor-pointer rounded-full border border-zinc-600 p-1 hover:border-purple-700 transition-colors"
                  src={unit.face}
                  onClick={() => handleUnitPreview(unit)}
                />
                {unit.type != 'Hero' && (
                  <span className="absolute top-0 border border-white w-8 h-8 bg-purple-700 text-center p-1 m-1">
                    {unit.stack}
                  </span>
                )}
                <h3 className="text-center text-sm">{unit.name}</h3>
              </div>
            ))}
          </div>
          <button
            onClick={handleVisibility}
          >
            Close
          </button>
        </div>
      </DarkBackgroundWrapper>
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}
    </>
  );
};

export default ZonePreview;
