import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./PopupMessage.style";

const PopupMessage = ({ customStyle, message, onPopupClick, ref }) => {
  return (
    <View ref={ref}>
      {Array.isArray(message) ? (
        <View style={{ ...styles.popUpArrayView, ...customStyle }}>
          {message?.map((item) => {
            return (
              <CustomTouchableOpacity
                style={{
                  ...styles.popUpComponentStyle,
                }}
                onPress={() => {
                  onPopupClick && onPopupClick(item);
                }}
              >
                <CommonText customTextStyle={styles.deletetext}>
                  {item}
                </CommonText>
              </CustomTouchableOpacity>
            );
          })}
        </View>
      ) : (
        <CustomTouchableOpacity
          style={{ ...styles.deletetextContainer, ...customStyle }}
          onPress={onPopupClick}
        >
          <CommonText customTextStyle={styles.deletetext}>{message}</CommonText>
        </CustomTouchableOpacity>
      )}
    </View>
  );
};

PopupMessage.defaultProps = {
  customStyle: {},
  message: [],
};

PopupMessage.propTypes = {
  customStyle: PropTypes.func,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onPopupClick: PropTypes.func.isRequired,
};

export default PopupMessage;
