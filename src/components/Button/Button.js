import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider/CssClassProvider";
import getStyles from "./Button.style";

const Button = ({
  children,
  disabled,
  disabledStyle,
  onPress,
  shouldShowHover,
  style,
  type,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const buttonComponentProp = shouldShowHover
    ? { className: classes["account-dropdown__base"] }
    : {};
  return (
    <button
      onClick={onPress}
      {...{ disabled, style, type }}
      style={{
        ...style,
        ...(disabled ? { ...styles.disabledBtn, ...disabledStyle } : {}),
      }}
      {...buttonComponentProp}
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
  shouldShowHover: false,
  style: {},
  type: "",
};

Button.protoTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  onPress: PropTypes.func,
  shouldShowHover: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Button;
