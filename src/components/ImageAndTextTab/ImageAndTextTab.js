import React from "react";
import { useTheme } from "@unthinkable/react-theme";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  Image,
} from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import getStyles from "./ImageAndTextTab.style";

const ImageAndTextTab = ({
  onPress,
  imageActive,
  imageInactive,
  isActive,
  text,
  containerStyle,
}) => {
  const theme = useTheme();
  const style = getStyles(theme);
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
          customTextStyle={
            isActive ? style.activeTextStyle : style.inActiveTextStyle
          }
        >
          {text}
        </CommonText>
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
