import { useBoardDisplay } from '../../../features/components/BattleUI';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { UnitPreview } from '../../PlayerUI/UnitPreview';
import { useUnitPreview } from '../../../features/UnitPreview';

const BattleBoard = () => {
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  const { mapUnitsInBoard } = useBoardDisplay({ handleUnitPreview });

  return (
    <>
      {previewUnit != undefined && (
        <DarkBackgroundWrapper>
          <UnitPreview
            handleExitUnitPreview={handleExitUnitPreview}
            previewUnit={previewUnit}
          />
        </DarkBackgroundWrapper>
      )}

      <div className="flex items-center justify-start sm:justify-center w-full md:w-max min-h-[70px] gap-2 overflow-x-auto shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">{mapUnitsInBoard}</div>
    </>
  );
};

export default BattleBoard;