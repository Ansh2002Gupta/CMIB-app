import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import styles from "./Backdrop.style";

const Backdrop = ({ onClose, preventCloseOnBackdropClick }) => {
  return (
    <View
      style={styles.backdrop}
      onClick={preventCloseOnBackdropClick ? () => {} : () => onClose()}
    ></View>
  );
};

Backdrop.propTypes = {
  onClose: PropTypes.func,
  preventCloseOnBackdropClick: PropTypes.bool,
};

export default Backdrop;
