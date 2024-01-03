import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import style from "./HeaderText.style";

const HeaderText = ({
  text,
  label,
  customTextStyle,
  customSecondHeadingStyles,
  customContainerStyles,
}) => {
  return (
    <View style={[style.headerContainer, customContainerStyles]}>
      <CommonText
        customTextStyle={[style.heading, customTextStyle]}
        title={text}
      />
      <CommonText
        customTextStyle={[style.secondHeading, customSecondHeadingStyles]}
        title={label}
      />
    </View>
  );
};

HeaderText.defaultProps = {
  customTextStyle: {},
  customSecondHeadingStyles: {},
  customContainerStyles: {},
};

HeaderText.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customTextStyle: PropTypes.object,
  customSecondHeadingStyles: PropTypes.object,
  customContainerStyles: PropTypes.object,
};

export default HeaderText;
