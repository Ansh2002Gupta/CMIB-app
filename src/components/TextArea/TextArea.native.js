import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { TextInput } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import getStyles from "./TextArea.style";

const TextArea = ({ customStyle, height, placeholderTextColor, ...props }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TextInput
      height={height}
      multiline
      placeholderTextColor={placeholderTextColor}
      style={{ ...styles.inputStyle, customStyle }}
      {...props}
    />
  );
};

TextArea.defaultProps = {
  customStyle: {},
  height: 84,
  placeholderTextColor: colors.darkGrey,
};

TextArea.propTypes = {
  customStyle: PropTypes.object,
  height: PropTypes.number,
  placeholderTextColor: PropTypes.string,
};

export default TextArea;
