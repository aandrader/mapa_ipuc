import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export const useBackdrop = (setIsOpen: Dispatch<SetStateAction<boolean>>) => {
  const elementRef = useRef<any>(null);

  useEffect(() => {
    const closeElement = (event: any) => {
      if (!elementRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeElement);
    return () => {
      document.removeEventListener("mousedown", closeElement);
    };
  });

  return elementRef;
};
