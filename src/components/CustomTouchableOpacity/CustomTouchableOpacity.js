import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "@unthinkable/react-core-components";

import styles from "./CustomTouchableOpacity.style";

const CustomTouchableOpacity = ({
  children,
  disabled,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{...styles.button, ...style}}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

CustomTouchableOpacity.defaultProps = {
  children: null,
  disabled: false,
  style: {},
};

CustomTouchableOpacity.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default CustomTouchableOpacity;
