import React, { useContext } from "react";
import { View } from "@unthinkable/react-core-components";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";

import FollowUsIcons from "../FollowUsIcons/FollowUsIcons.js";
import getStyles from "./WebViewLoginSignUpWrapper.style.js";

const WebViewLoginSignUpWrapper = ({
  children,
  shouldApplyStyles,
  shouldShowFollowUs,
}) => {
  const theme = useTheme();
  const style = getStyles(theme);
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const isWidthLessThan1800 = currentBreakpoint === "xl";
  const isWidthLessThan1400 = currentBreakpoint === "lg";
  const isWidthLessThan1000 = currentBreakpoint === "md";
  const isWidthLessThan600 = currentBreakpoint === "sm";

  const getResponsiveStyles = (str) => {
    switch (str) {
      case "innerContainer": {
        if (isWidthLessThan600) {
          return {
            ...style.innerContainer,
            ...style.innerContainer600,
          };
        }
        if (isWidthLessThan1000) {
          return {
            ...style.innerContainer,
            ...style.innerContainer1000,
          };
        }
        if (isWidthLessThan1400) {
          return {
            ...style.innerContainer,
            ...style.innerContainer1400,
          };
        }
        if (isWidthLessThan1800) {
          return {
            ...style.innerContainer,
            ...style.innerContainer1800,
          };
        }
        return style.innerContainer;
      }
      default: {
        return {};
      }
    }
  };

  return (
    <>
      <View
        style={{
          ...style.container,
          ...(shouldApplyStyles ? style.responsiveContainer : {}),
        }}
      >
        <View
          style={
            shouldApplyStyles
              ? style.outerContainer
              : style.defaultOuterContainerStyles
          }
        >
          <View
            style={
              shouldApplyStyles
                ? getResponsiveStyles("innerContainer")
                : style.defaultInnerContainerStyles
            }
          >
            {children}
          </View>
          {shouldShowFollowUs && shouldApplyStyles && <FollowUsIcons />}
        </View>
      </View>
    </>
  );
};

export default WebViewLoginSignUpWrapper;
