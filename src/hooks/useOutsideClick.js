import { useEffect } from "react";
import { Platform } from "@unthinkable/react-core-components";

const isWeb = Platform.OS.toLowerCase() === "web";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    if (isWeb) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (isWeb) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [ref, callback]);
};

export default useOutsideClick;
