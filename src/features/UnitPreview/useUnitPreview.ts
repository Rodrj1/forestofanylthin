import { useState } from "react";
import { UnitStats } from "../../types";
import { useActionSound } from "../../hooks/useActionSound";

export const useUnitPreview = () => {
  const [previewUnit, setPreviewUnit] = useState<UnitStats | undefined>();
  const { playPreviewSound } = useActionSound();
  const handleUnitPreview = (unit: UnitStats) => {
    playPreviewSound();
    setPreviewUnit(unit);
  };

  const handleExitUnitPreview = () => {
    setPreviewUnit(undefined);
  };
  return {
    previewUnit,
    handleUnitPreview,
    handleExitUnitPreview,
  };
};
