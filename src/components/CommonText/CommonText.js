import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import styles from "./CommonText.style";

const CommonText = ({
  customContainerStyle,
  customTextStyle,
  children,
  fontWeight,
}) => {
  const styleArray = Array.isArray(customTextStyle)
    ? customTextStyle
    : [customTextStyle];

  const textStyles = [styles.textStyle(fontWeight), ...styleArray];

  return (
    <View style={customContainerStyle}>
      <Text style={textStyles}>{children}</Text>
    </View>
  );
};

CommonText.defaultProps = {
  customContainerStyle: {},
  customTextStyle: {},
  fontWeight: "500",
};

CommonText.propTypes = {
  customContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fontWeight: PropTypes.string,
  children: PropTypes.any,
};

export default CommonText;
