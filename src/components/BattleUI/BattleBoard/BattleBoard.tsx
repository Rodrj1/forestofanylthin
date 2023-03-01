import { useBoardDisplay } from '../../../features/components/BattleUI';
import { DarkBackgroundWrapper } from '../../DarkBackgroundWrapper';
import { UnitPreview } from '../../PlayerUI/UnitPreview';
import { useUnitPreview } from '../../../features/UnitPreview';
import BoardCSS from './style.module.scss';

const BattleBoard = () => {
  const { handleUnitPreview, handleExitUnitPreview, previewUnit } =
    useUnitPreview();

  const { mapUnitsInBoard } = useBoardDisplay({ handleUnitPreview, BoardCSS });

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

      <div className={BoardCSS.container}>{mapUnitsInBoard}</div>
    </>
  );
};

export default BattleBoard;
