import { useState } from "react";
import { useActionSound } from "../../hooks/useSound";
import { useChangeVisibility } from "../../hooks/useVisibility";
import { UnitStats } from "../../types";

export const useZonePreview = () => {
  const [previewLevelInfo, setPreviewLevelInfo] = useState<UnitStats[]>();

  const { isVisible, handleVisibility } = useChangeVisibility();
  const { playPreviewSound } = useActionSound();

  const handlePreviewLevel = (enemies: UnitStats[]) => {
    playPreviewSound();
    handleVisibility();
    setPreviewLevelInfo(enemies);
  };
  return {
    previewLevelInfo,
    isVisible,
    handleVisibility,
    handlePreviewLevel,
  };
};
