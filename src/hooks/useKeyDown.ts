import { useEffect } from "react";

export const useKeyDown = (
  key: string,
  onKeyDown: (event: KeyboardEvent) => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) onKeyDown(event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, onKeyDown, enabled]);
};
