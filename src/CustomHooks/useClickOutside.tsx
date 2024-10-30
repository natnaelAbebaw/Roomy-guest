import { useEffect, useRef, useState } from "react";

export function useClickOutside<T extends HTMLElement>(forModal = false) {
  const [clickState, setClickState] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!forModal || !(event.target as HTMLElement).closest(".modal"))
      ) {
        setClickState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return { clickState, setClickState, ref };
}
