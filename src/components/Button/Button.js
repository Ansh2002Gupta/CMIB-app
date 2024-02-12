import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.style";

const Button = ({
  children,
  disabled,
  disabledStyle,
  onPress,
  style,
  type,
}) => {
  return (
    <button
      onClick={onPress}
      {...{ disabled, style, type }}
      style={{
        ...style,
        ...(disabled ? { ...styles.disabledBtn, ...disabledStyle } : {}),
      }}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: <></>,
  disabled: false,
  disabledStyle: {},
  onPress: () => {},
  style: {},
  type: "",
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
