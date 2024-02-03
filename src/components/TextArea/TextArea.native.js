import React from "react";
import { TextInput } from "@unthinkable/react-core-components";

import colors from "../../assets/colors";
import styles from "./TextArea.style";

const TextArea = ({ ...props }) => {
  return (
    <TextInput
      height={84}
      multiline
      placeholderTextColor={colors.darkGrey}
      style={styles.inputStyle}
      {...props}
    />
  );
};

export default TextArea;
