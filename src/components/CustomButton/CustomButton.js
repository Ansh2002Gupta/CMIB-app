import React from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity } from "@unthinkable/react-core-components";

import styles from "./CustomButton.style";

const CustomButton = ({ children, onPress, style, withGreenBackground }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.defaultBtnStyles,
        ...(withGreenBackground ? styles.greenBtn : {}),
        ...style,
      }}
    >
      <Text style={styles.btnText}>{children} </Text>
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  children: <></>,
  onPress: () => {},
  style: {},
  withGreenBackground: false,
};

CustomButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.object,
  withGreenBackground: PropTypes.bool,
};

export default CustomButton;
