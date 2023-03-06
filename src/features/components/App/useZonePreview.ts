import { useState } from 'react';
import { useActionSound, useChangeVisibility } from '../../../hooks';
import { Army } from '../../../types';

export const useZonePreview = () => {
  const [previewLevelInfo, setPreviewLevelInfo] = useState<Army>();

  const { isVisible, handleVisibility } = useChangeVisibility();
  const { playPreviewSound } = useActionSound();

  const handlePreviewLevel = (enemies: Army) => {
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
