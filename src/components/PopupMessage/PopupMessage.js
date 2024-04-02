import React, { useState } from "react";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import styles from "./PopupMessage.style";
import { ScrollView, View } from "@unthinkable/react-core-components";
import colors from "../../assets/colors";
import TouchableImage from "../TouchableImage";
import images from "../../images";

const PopupMessage = ({ customStyle, message, onPopupClick, popUpArray }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  return (
    <View>
      {popUpArray.length ? (
        <View style={styles.containerStyle}>
          <View style={{ zIndex: 10 }}>
            {isPopUpVisible && (
              <ScrollView style={styles.popUpArrayView}>
                {popUpArray.map((item) => {
                  return (
                    <CustomTouchableOpacity
                      style={{
                        ...styles.popUpComponentStyle,
                        ...customStyle,
                      }}
                      onPress={() => onPopupClick(item)}
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
            onPress={() => setIsPopUpVisible(!isPopUpVisible)}
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
  popUpArray: [],
};

PopupMessage.propTypes = {
  customStyle: PropTypes.func,
  message: PropTypes.string.isRequired,
  onPopupClick: PropTypes.func.isRequired,
  popUpArray: PropTypes.array,
};

export default PopupMessage;
