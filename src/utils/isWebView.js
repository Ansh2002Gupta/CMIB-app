import { useContext } from "react";
import { MediaQueryContext } from "@unthinkable/react-theme";

export default function useIsWebView() {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWebView = currentBreakpoint !== "xs";
  return {
    isWebView,
  };
}
