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

CommonText.propTypes = {
  customContainerStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default CommonText;
