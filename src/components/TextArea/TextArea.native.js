import React from "react";
import { TextInput } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import styles from "./TextArea.style";

const TextArea = ({ customStyle, height, ...props }) => {
  return (
    <TextInput
      height={84}
      multiline
      placeholderTextColor={colors.darkGrey}
      style={{ ...styles.inputStyle, customStyle }}
      {...props}
    />
  );
};

TextArea.defaultProps = {
  customStyle: {},
  height: 84,
};

TextArea.propTypes = {
  customStyle: PropTypes.object,
  height: PropTypes.number,
};

export default TextArea;
