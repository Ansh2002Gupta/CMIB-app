import React from "react";
import classes from "../../theme/styles/CssClassProvider";
import styles from "./TextArea.style";

const TextArea = ({ onChangeText, ...props }) => {
  return (
    <textarea
      rows={4}
      cols={40}
      style={styles.inputContainer}
      className={classes["text-area__base"]}
      onChange={(e) => {
        onChangeText(e.target.value);
      }}
      {...props}
    />
  );
};

export default TextArea;
