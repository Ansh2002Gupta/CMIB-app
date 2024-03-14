import { useEffect } from "react";
import { Platform } from "@unthinkable/react-core-components";

const useEscKeyListener = (callback) => {
  const isWeb = Platform.OS.toLowerCase() === "web";

  useEffect(() => {
    const handleKeyEsc = (event) => {
      if (event.key === "Escape") {
        callback && callback();
      }
    };
    if (isWeb) {
      document.addEventListener("keydown", handleKeyEsc);
    }
    return () => {
      if (isWeb) {
        document.removeEventListener("keydown", handleKeyEsc);
      }
    };
  }, [callback]);
};

export default useEscKeyListener;
