import React from "react";
import { TextInput } from "@unthinkable/react-core-components";
import styles from "./TextArea.style";
import colors from "../../assets/colors";

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
