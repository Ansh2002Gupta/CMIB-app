import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MediaQueryContext } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import {
  getResponsiveStyles,
  style,
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

  return (
    <View style={[style.headerContainer, customContainerStyles]}>
      {!!label && (
        <CommonText title={label} customTextStyle={style.labelText} />
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
          customTextStyle={[style.secondHeading, customSecondHeadingStyles]}
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
