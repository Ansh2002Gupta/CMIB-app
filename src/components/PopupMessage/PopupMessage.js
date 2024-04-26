import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomModal from "../CustomModal";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import useIsWebView from "../../hooks/useIsWebView";
import Spinner from "../Spinner";
import { useTheme } from "@unthinkable/react-theme";
import getStyles from "./PopupMessage.style";

const PopupMessage = ({
  customStyle,
  message,
  isPopupModal,
  onPopupClick,
  onPopUpClose,
  popUpHeaderText,
  labelName,
  showLoaderAt,
}) => {
  const { isWebView } = useIsWebView();
  const intl = useIntl();
  const theme = useTheme();
  const styles = getStyles(theme);

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
                  {item?.[labelName]}
                </CommonText>
                {item?.key && showLoaderAt === item?.key ? (
                  <Spinner thickness={2} customStyle={styles.spinner} />
                ) : (
                  <></>
                )}
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
                  {item?.[labelName]}
                </CommonText>
                {item?.key && showLoaderAt === item?.key ? (
                  <Spinner
                    size="xs"
                    thickness={2}
                    customStyle={styles.spinner}
                  />
                ) : (
                  <></>
                )}
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
  labelName: "name",
  isPopupModal: false,
  data: {},
};

PopupMessage.propTypes = {
  customStyle: PropTypes.object,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  labelName: PropTypes.string,
  onPopupClick: PropTypes.func.isRequired,
  isPopupModal: PropTypes.bool,
  onPopUpClose: PropTypes.func,
};

export default PopupMessage;
