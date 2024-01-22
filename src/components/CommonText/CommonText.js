import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import styles from "./CommonText.style";

const CommonText = ({
  children,
  customContainerStyle,
  customTextStyle,
  fontWeight,
  isunderLine,
  underLinecolor,
}) => {
  const styleArray = Array.isArray(customTextStyle)
    ? customTextStyle
    : [customTextStyle];

  const textStyles = [styles.textStyle(fontWeight), ...styleArray];

  return (
    <View style={customContainerStyle}>
      <Text style={textStyles}>{children}</Text>
     { isunderLine && <View style={styles.horizontalLine(underLinecolor)} />}
    </View>
  );
};

CommonText.defaultProps = {
  children: <></>,
  customContainerStyle: {},
  customTextStyle: {},
  fontWeight: "500",
  isunderLine:false,
  underLinecolor:colors.black,
};

CommonText.propTypes = {
  children: PropTypes.node,
  customContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  fontWeight: PropTypes.string,
  isunderLine:PropTypes.bool,
  underLinecolor:PropTypes.string,
};

export default CommonText;
