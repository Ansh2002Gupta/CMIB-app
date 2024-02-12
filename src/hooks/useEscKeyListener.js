import { useEffect } from "react";

const useEscKeyListener = (callback) => {
  useEffect(() => {
    const handleKeyEsc = (event) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyEsc);

    return () => {
      document.removeEventListener("keydown", handleKeyEsc);
    };
  }, [callback]);
};

export default useEscKeyListener;
