import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./PopupMessage.style";

const PopupMessage = ({ customStyle, message, onPopupClick }) => {
  return (
    <CustomTouchableOpacity
      style={{ ...styles.deletetextContainer, ...customStyle }}
      onPress={onPopupClick}
    >
      <CommonText customTextStyle={styles.deletetext}>{message}</CommonText>
    </CustomTouchableOpacity>
  );
};

PopupMessage.defaultProps = {
  customStyle: {},
};

PopupMessage.propTypes = {
  customStyle: PropTypes.object,
  message: PropTypes.string.isRequired,
  onPopupClick: PropTypes.func.isRequired,
};

export default PopupMessage;
