import { useEffect } from "react";
import { Platform } from "@unthinkable/react-core-components";

const isWeb = Platform.OS.toLowerCase() === "web";

const useHandleInfiniteScroll = (handleLoadMore, flatListRef) => {
  const handleInfiniteScroll = () => {
    if (!flatListRef.current) return;

    const { scrollTop } = flatListRef.current;
    const threshold = 0.1;
    if (scrollTop <= threshold) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    const element = flatListRef.current;

    if (element && isWeb) {
      element.addEventListener("scroll", handleInfiniteScroll, {
        passive: true,
      });
    }
    return () => {
      if (element && isWeb) {
        element.removeEventListener("scroll", handleInfiniteScroll);
      }
    };
  }, [handleLoadMore, flatListRef]);
};

export default useHandleInfiniteScroll;
