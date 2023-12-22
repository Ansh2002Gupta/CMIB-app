import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "@unthinkable/react-core-components";

import styles from "./CustomTouchableOpacity.style";

const CustomTouchableOpacity = ({
  onPress,
  children,
  style,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

CustomTouchableOpacity.defaultProps = {
  children: null,
  style: {},
  disabled: false,
};

CustomTouchableOpacity.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  disabled: PropTypes.bool,
};

export default CustomTouchableOpacity;
