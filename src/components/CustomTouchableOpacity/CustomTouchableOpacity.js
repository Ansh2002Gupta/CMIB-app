import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { TouchableOpacity } from "@unthinkable/react-core-components";

import getStyles from "./CustomTouchableOpacity.style";

const CustomTouchableOpacity = ({
  children,
  disabled,
  onPress,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const styleArray = Array.isArray(style) ? style : [style];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabledButton, ...styleArray]}
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
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CustomTouchableOpacity;
