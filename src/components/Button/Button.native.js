import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "@unthinkable/react-core-components";

import styles from "./Button.style";

const Button = ({ children, disabled, onPress, style }) => {
  return (
    <TouchableOpacity
      {...{ disabled, onPress }}
      style={{ ...style, ...(disabled ? styles.disabledBtn : {}) }}
    >
      {children}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  children: <></>,
  disabled: false,
  onPress: () => {},
  style: {},
};

Button.protoTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
