import React from "react";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./PopupMessage.style";

const PopupMessage = ({ customStyle = {}, message, onPopupClick }) => {
  return (
    <CustomTouchableOpacity
      style={{ ...styles.deletetextContainer, ...customStyle }}
      onPress={onPopupClick}
    >
      <CommonText customTextStyle={styles.deletetext}>{message}</CommonText>
    </CustomTouchableOpacity>
  );
};

export default PopupMessage;
