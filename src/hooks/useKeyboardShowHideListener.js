import { useEffect } from "react";
import { Keyboard, Platform } from "@unthinkable/react-core-components";

const useKeyboardShowHideListener = ({
  keyboardDidShowCallback,
  keyboardDidHideCallback,
}) => {
  const isPlatformNotWeb = Platform.OS.toLowerCase() !== "web";
  useEffect(() => {
    let keyboardDidShowListener;
    let keyboardDidHideListener;

    if (isPlatformNotWeb) {
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
      if (isPlatformNotWeb) {
        keyboardDidShowListener?.remove();
        keyboardDidHideListener?.remove();
      }
    };
  }, [keyboardDidShowCallback, keyboardDidHideCallback]);
};

export default useKeyboardShowHideListener;
