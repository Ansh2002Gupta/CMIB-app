import React from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./PopupMessage.style";

const PopupMessage = ({
  customMessageStyle,
  customStyle,
  message,
  onPopupClick,
}) => {
  return (
    <CustomTouchableOpacity
      style={{ ...styles.deletetextContainer, ...customStyle }}
      onPress={onPopupClick}
    >
      <CommonText
        customTextStyle={{ ...styles.deletetext, ...customMessageStyle }}
      >
        {message}
      </CommonText>
    </CustomTouchableOpacity>
  );
};

PopupMessage.defaultProps = {
  customMessageStyle: {},
  customStyle: {},
};

PopupMessage.propTypes = {
  customMessageStyle: PropTypes.object,
  customStyle: PropTypes.object,
  message: PropTypes.string.isRequired,
  onPopupClick: PropTypes.func.isRequired,
};

export default PopupMessage;
