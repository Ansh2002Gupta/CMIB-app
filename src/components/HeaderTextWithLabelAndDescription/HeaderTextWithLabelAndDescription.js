import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext, useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import useIsWebView from "../../hooks/useIsWebView";
import {
  getResponsiveStyles,
  getStyles,
} from "./HeaderTextWithLabelAndDescription.style";

const HeaderTextWithLabelAndDescription = ({
  customContainerStyles,
  customSecondHeadingStyles,
  customTextStyle,
  description,
  headerText,
  label,
}) => {
  const { current: currentBreakpoint } = useContext(MediaQueryContext);
  const { isWebView } = useIsWebView();

  const theme = useTheme();
  const style = getStyles(theme);

  return (
    <View style={{ ...customContainerStyles }}>
      {!!label && (
        <CommonText customTextStyle={style.labelText}> {label}</CommonText>
      )}
      {!!headerText && (
        <CommonText
          customTextStyle={[
            getResponsiveStyles({ str: "headerText", currentBreakpoint }),
            style.heading,
            customTextStyle,
          ]}
          fontWeight={customTextStyle?.fontWeight || "600"}
        >
          {headerText}
        </CommonText>
      )}
      {!!description && (
        <CommonText
          customTextStyle={{
            ...style.secondHeading,
            ...(isWebView ? style.webDescriptionStyle : {}),
            ...customSecondHeadingStyles,
          }}
        >
          {description}
        </CommonText>
      )}
    </View>
  );
};

HeaderTextWithLabelAndDescription.defaultProps = {
  customContainerStyles: {},
  customSecondHeadingStyles: {},
  customTextStyle: {},
  description: "",
  headerText: "",
  label: "",
};

HeaderTextWithLabelAndDescription.propTypes = {
  customContainerStyles: PropTypes.object,
  customSecondHeadingStyles: PropTypes.object,
  customTextStyle: PropTypes.object,
  description: PropTypes.string,
  headerText: PropTypes.string,
  label: PropTypes.string,
};

export default HeaderTextWithLabelAndDescription;
