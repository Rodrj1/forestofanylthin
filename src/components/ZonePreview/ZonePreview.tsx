import { Army } from "../../types";
import { useUnitPreview } from "../../features/UnitPreview/useUnitPreview";
import { DarkBackgroundWrapper } from "../DarkBackgroundWrapper";
import UnitPreview from "../PlayerUI/UnitPreview/UnitPreview";
import zonePreviewCSS from "./style.module.scss";

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
        <div className={zonePreviewCSS.level}>
          <h2>Scouting reveals:</h2>
          <div className={zonePreviewCSS.levelUnits}>
            {previewLevel?.map((unit) => (
              <div className={zonePreviewCSS.unit} key={unit.id}>
                <img src={unit.face} onClick={() => handleUnitPreview(unit)} />
                {unit.type != "Hero" && <p>{unit.stack}</p>}
                <h3>{unit.name}</h3>
              </div>
            ))}
          </div>
          <button onClick={handleVisibility}>CLOSE</button>
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
