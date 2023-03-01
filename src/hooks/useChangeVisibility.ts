import { useState } from "react";

export const useChangeVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    setIsVisible((visible) => !visible);
  };

  return { isVisible, handleVisibility };
};
