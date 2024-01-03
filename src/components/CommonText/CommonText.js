import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "@unthinkable/react-core-components";

import styles from "./CommonText.style";

const CommonText = ({ customContainerStyle, customTextStyle, title }) => {
  const styleArray = Array.isArray(customTextStyle)
    ? customTextStyle
    : [customTextStyle];
  return (
    <View style={customContainerStyle}>
      <Text style={[styles.textStyle, ...styleArray]}>{title}</Text>
    </View>
  );
};

CommonText.defaultProps = {
  customContainerStyle: {},
  customTextStyle: {},
};

CommonText.propTypes = {
  customContainerStyle: PropTypes.object,
  customTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommonText;
