import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import getStyles from "./Backdrop.style";

const Backdrop = ({ onClose, preventCloseOnBackdropClick }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View
      style={styles.backdrop}
      onClick={preventCloseOnBackdropClick ? () => {} : () => onClose()}
    ></View>
  );
};

Backdrop.defaultProps = {
  onClose: () => {},
  preventCloseOnBackdropClick: false,
};

Backdrop.propTypes = {
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Backdrop;
