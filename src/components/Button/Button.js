import React from "react";
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider/CssClassProvider";
import styles from "./Button.style";

const Button = ({
  children,
  disabled,
  onPress,
  shouldShowHover,
  style,
  type,
}) => {
  const buttonComponentProp = shouldShowHover
    ? { className: classes["account-dropdown__base"] }
    : {};
  return (
    <button
      onClick={onPress}
      {...{ disabled, style, type }}
      style={{ ...style, ...(disabled ? styles.disabledBtn : {}) }}
      {...buttonComponentProp}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: <></>,
  disabled: false,
  onPress: () => {},
  shouldShowHover: false,
  style: {},
  type: "",
};

Button.protoTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  shouldShowHover: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
