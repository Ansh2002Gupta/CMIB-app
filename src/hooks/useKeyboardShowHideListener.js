import { useEffect } from "react";
import { Keyboard, Platform } from "@unthinkable/react-core-components";

const useKeyboardShowHideListener = ({
  keyboardDidShowCallback,
  keyboardDidHideCallback,
}) => {
  const isWebPlatform = Platform.OS.toLowerCase() !== "web";
  useEffect(() => {
    let keyboardDidShowListener;
    let keyboardDidHideListener;

    if (isWebPlatform) {
      keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShowCallback
      );
      keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHideCallback
      );
    }

    return () => {
      if (isWebPlatform) {
        keyboardDidShowListener?.remove();
        keyboardDidHideListener?.remove();
      }
    };
  }, [keyboardDidShowCallback, keyboardDidHideCallback]);
};

export default useKeyboardShowHideListener;
