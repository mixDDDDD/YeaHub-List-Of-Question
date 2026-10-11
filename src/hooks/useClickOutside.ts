import { useEffect, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  onOutsideClick: () => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const refs = Array.isArray(ref) ? ref : [ref];
      const elements = refs.map((item) => item.current).filter(Boolean);
      const target = event.target;
      const path = event.composedPath();
      if (
        elements.length > 0 &&
        target instanceof Node &&
        !elements.some(
          (element) => element && (path.includes(element) || element.contains(target)),
        )
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, onOutsideClick, enabled]);
};
