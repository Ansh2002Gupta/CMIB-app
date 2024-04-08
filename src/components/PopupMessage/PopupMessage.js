import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomModal from "../CustomModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import styles from "./PopupMessage.style";

const PopupMessage = ({
  customStyle,
  message,
  isPopupModal,
  onPopupClick,
  onPopUpClose,
  popUpHeaderText,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();

  const renderPopupContent = () => {
    if (Array.isArray(message)) {
      if (isPopupModal && !isWebView) {
        return (
          <CustomModal
            headerText={popUpHeaderText}
            isIconCross
            onPressIconCross={onPopUpClose}
            onBackdropPress={onPopUpClose}
          >
            {message.map((item, index) => (
              <CustomTouchableOpacity
                key={index}
                style={styles.popUpComponentStyle}
                onPress={() => onPopupClick(item)}
              >
                <CommonText customTextStyle={styles.deletetext}>
                  {item}
                </CommonText>
              </CustomTouchableOpacity>
            ))}
          </CustomModal>
        );
      } else {
        return (
          <View style={{ ...styles.popUpArrayView, ...customStyle }}>
            {message.map((item, index) => (
              <CustomTouchableOpacity
                key={index}
                style={styles.popUpComponentStyle}
                onPress={() => onPopupClick(item)}
              >
                <CommonText customTextStyle={styles.deletetext}>
                  {item}
                </CommonText>
              </CustomTouchableOpacity>
            ))}
          </View>
        );
      }
    } else {
      return (
        <CustomTouchableOpacity
          style={{ ...styles.deletetextContainer, ...customStyle }}
          onPress={() => onPopupClick(message)}
        >
          <CommonText customTextStyle={styles.deletetext}>{message}</CommonText>
        </CustomTouchableOpacity>
      );
    }
  };

  return <View>{renderPopupContent()}</View>;
};

PopupMessage.defaultProps = {
  customStyle: {},
  message: [],
};

PopupMessage.propTypes = {
  customStyle: PropTypes.object,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onPopupClick: PropTypes.func.isRequired,
  isPopupModal: PropTypes.bool.isRequired,
  onPopUpClose: PropTypes.func,
};

export default PopupMessage;
