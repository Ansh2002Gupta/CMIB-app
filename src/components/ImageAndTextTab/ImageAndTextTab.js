import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
} from "@unthinkable/react-core-components";
import PropTypes from "prop-types";

import CommonText from "../CommonText";
import style from "./ImageAndTextTab.style";

const ImageAndTextTab = ({
  onPress,
  imageActive,
  imageInactive,
  isActive,
  text,
  containerStyle,
}) => {
  const containerDynamicStyle = isActive
    ? containerStyle || style.activeStyleDashboard
    : style.inActiveStyle;

  const imageSource = isActive ? imageActive : imageInactive;
  return (
    <>
      <View style={containerDynamicStyle} />
      <TouchableOpacity style={style.buttonStyle} onPress={onPress}>
        <Image source={imageSource} />
        <CommonText
          title={text}
          customTextStyle={
            isActive ? style.activeTextStyle : style.inActiveTextStyle
          }
        />
      </TouchableOpacity>
    </>
  );
};

ImageAndTextTab.propTypes = {
  onPress: PropTypes.func.isRequired,
  imageActive: PropTypes.string.isRequired,
  imageInactive: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
};

export default ImageAndTextTab;
