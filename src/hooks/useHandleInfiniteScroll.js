import React, { useEffect } from "react";
import useIsWebView from "./useIsWebView";

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
    window.addEventListener("scroll", handleInfinteScroll);
    return () => window.removeEventListener("scroll", handleInfinteScroll);
  }, [handleInfinteScroll]);
};

export default useHandleInfiniteScroll;
