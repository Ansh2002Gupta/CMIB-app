import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";

import classes from "../../theme/styles/CssClassProvider";
import getStyles from "./TextArea.style";

const TextArea = ({
  cols,
  customStyle,
  isError,
  onChangeText,
  rows,
  ...props
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <textarea
      rows={rows}
      cols={cols}
      style={{
        ...styles.inputContainer,
        ...(isError ? styles.invalidInput : {}),
      }}
      className={classes["text-area__base"]}
      onChange={(e) => {
        onChangeText && onChangeText(e.target.value);
      }}
      {...props}
    />
  );
};

TextArea.defaultProps = {
  cols: 0,
  customStyle: {},
  isError: false,
  rows: 4,
  onChangeText: () => {},
};

TextArea.propTypes = {
  cols: PropTypes.number,
  customStyle: PropTypes.object,
  isError: PropTypes.bool,
  rows: PropTypes.number,
  onChangeText: PropTypes.func,
};

export default TextArea;
