import React from "react";

import useMediaQuery from "../../npms/react-utils/src/hooks/useMediaQuery.js";
import images from "../../images";
import { View, Image } from "@unthinkable/react-core-components";
import { style } from "./WebViewLoginSignUpWrapper.style.js";

const WebViewLoginSignUpWrapper = ({ shouldApplyStyles, children }) => {
  const isWidthLessThan1800 = useMediaQuery("(max-width: 1800px)");
  const isWidthLessThan1400 = useMediaQuery("(max-width: 1400px)");
  const isWidthLessThan1000 = useMediaQuery("(max-width: 1000px)");
  const isWidthLessThan600 = useMediaQuery("(max-width: 600px)");

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
      default : {
        return {};
      }
    }
  };

  return (
    <>
      <View style={style.container}>
        {/* Please remove this dummy header image later */}
        {shouldApplyStyles && (
          <Image source={images.headerDummyImage} style={{ width: "100%" }} />
        )}
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
        </View>
      </View>
    </>
  );
};

export default WebViewLoginSignUpWrapper;
