import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import TouchableImage from "../TouchableImage";
import useOutsideClick from "../../hooks/useOutsideClick";
import images from "../../images";
import styles from "./PopupMessage.style";

const PopupMessage = ({ customStyle, message, onPopupClick }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsPopUpVisible(false));

  return (
    <View style={styles.zIndex10}>
      {Array.isArray(message) ? (
        <View style={styles.containerStyle}>
          <View style={styles.zIndex10}>
            {isPopUpVisible && (
              <ScrollView style={styles.popUpArrayView} ref={wrapperRef}>
                {message.map((item) => {
                  return (
                    <CustomTouchableOpacity
                      style={{
                        ...styles.popUpComponentStyle,
                        ...customStyle,
                      }}
                      onPress={() => {
                        onPopupClick && onPopupClick(item);
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
