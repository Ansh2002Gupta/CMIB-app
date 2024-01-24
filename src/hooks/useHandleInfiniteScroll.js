import React, { useEffect } from "react";
import { Platform } from "@unthinkable/react-core-components";

import useIsWebView from "./useIsWebView";

const isWeb = Platform.OS.toLowerCase() === "web";

const useHandleInfiniteScroll = (scrollHandler) => {
  const { isWebView } = useIsWebView();
  const handleInfinteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        !isWebView
      ) {
        scrollHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isWeb) {
      window.addEventListener("scroll", handleInfinteScroll);
    }
    return () => {
      if (isWeb) {
        window.removeEventListener("scroll", handleInfinteScroll);
      }
    };
  }, []);
};

export default useHandleInfiniteScroll;
