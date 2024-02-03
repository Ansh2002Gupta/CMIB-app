import React from "react";
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider";
import styles from "./TextArea.style";

const TextArea = ({ customStyle, cols, onChangeText, rows, ...props }) => {
  return (
    <textarea
      rows={rows}
      cols={cols}
      style={styles.inputContainer}
      className={classes["text-area__base"]}
      onChange={(e) => {
        onChangeText && onChangeText(e.target.value);
      }}
      {...props}
    />
  );
};

TextArea.defaultProps = {
  customStyle: {},
  cols: 40,
  rows: 4,
  onChangeText: () => {},
};

TextArea.propTypes = {
  customStyle: PropTypes.object,
  cols: PropTypes.number,
  rows: PropTypes.number,
  onChangeText: PropTypes.func,
};

export default TextArea;
