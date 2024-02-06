import React from "react";
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider";
import styles from "./TextArea.style";

const TextArea = ({ cols, customStyle, onChangeText, rows, ...props }) => {
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
  cols: 40,
  customStyle: {},
  rows: 4,
  onChangeText: () => {},
};

TextArea.propTypes = {
  cols: PropTypes.number,
  customStyle: PropTypes.object,
  rows: PropTypes.number,
  onChangeText: PropTypes.func,
};

export default TextArea;
