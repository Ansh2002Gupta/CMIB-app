import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import styles from "./PopupMessage.style";
import useIsWebView from "../../hooks/useIsWebView";
import CustomModal from "../CustomModal";

const PopupMessage = ({ customStyle, message, onPopupClick, itemSelected }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const wrapperRef = useRef(null);
  const { isWebView } = useIsWebView();
  useOutsideClick(wrapperRef, () => setIsPopUpVisible(false));

  return (
    <View style={styles.zIndex10}>
      {Array.isArray(message) ? (
        <View style={styles.containerStyle}>
          <View style={styles.zIndex10}>
            {isPopUpVisible && (
              <>
                {isWebView ? (
                  <ScrollView style={styles.popUpArrayView} ref={wrapperRef}>
                    {message.map((item) => {
                      return (
                        <CustomTouchableOpacity
                          style={{
                            ...styles.popUpComponentStyle,
                            ...customStyle,
                          }}
                          onPress={() => {
                            onPopupClick && onPopupClick(item, itemSelected);
                            setIsPopUpVisible(false);
                          }}
                        >
                          <CommonText customTextStyle={styles.deletetext}>
                            {item}
                          </CommonText>
                        </CustomTouchableOpacity>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <CustomModal
                    onPressIconCross={() => {
                      setIsPopUpVisible(false);
                    }}
                    onBackdropPress={() => {
                      setIsPopUpVisible(false);
                    }}
                  >
                    {message.map((item, index) => (
                      <CustomTouchableOpacity
                        key={index}
                        style={styles.popUpComponentStyle}
                        onPress={() => {
                          setIsPopUpVisible(false);
                          onPopupClick && onPopupClick(item, itemSelected);
                        }}
                      >
                        <CommonText customTextStyle={styles.deletetext}>
                          {item}
                        </CommonText>
                      </CustomTouchableOpacity>
                    ))}
                  </CustomModal>
                )}
              </>
            )}
          </View>
          <TouchableImage
            source={images.iconMore}
            disabled={isPopUpVisible}
            onPress={() => {
              if (!isPopUpVisible) {
                setIsPopUpVisible(!isPopUpVisible);
              }
            }}
          />
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
