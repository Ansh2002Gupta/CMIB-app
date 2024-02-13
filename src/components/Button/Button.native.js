import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "@unthinkable/react-core-components";

import styles from "./Button.style";

const Button = ({ children, disabled, disabledStyle, onPress, style }) => {
  return (
    <TouchableOpacity
      {...{ disabled, onPress }}
      style={{
        ...style,
        ...(disabled ? { ...styles.disabledBtn, ...disabledStyle } : {}),
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  children: <></>,
  disabled: false,
  disabledStyle: {},
  onPress: () => {},
  style: {},
};

Button.protoTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
