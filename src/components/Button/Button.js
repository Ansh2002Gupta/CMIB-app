import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.style";

const Button = ({ children, disabled, onPress, style, type }) => {
  return (
    <button
      onClick={onPress}
      {...{ disabled, style, type }}
      style={{ ...style, ...(disabled ? styles.disabledBtn : {}) }}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: <></>,
  disabled: false,
  onPress: () => {},
  style: {},
  type: "",
};

Button.protoTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
