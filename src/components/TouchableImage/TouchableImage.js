import React, { useState } from "react";
import PropTypes from "prop-types";
import {View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage/CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity/CustomTouchableOpacity"
import styles from "./TouchableImage.style";

const TouchableImage = ({ disabled,isSelector , imageStyle, onPress, parentStyle, source, }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!disabled) 
    setIsSelected((prev) => !prev);
  };

  const containerStyle = {
    ...styles.container,
    ...parentStyle,
    ...(isSelected ? styles.selected : {}),
  };

  return (
    <CustomTouchableOpacity
      style={containerStyle}
      onPress={isSelector ? handlePress :onPress }
      disabled={disabled}
    >
      <View>
        <CustomImage
          Icon={source}
          style={imageStyle}
          source={source}
          isSvg={true}
        />
      </View>
    </CustomTouchableOpacity>
  );
};

TouchableImage.defaultProps = {
  disabled: false,
  isSeletor:false,
  imageStyle: {},
  parentStyle: {},
};

TouchableImage.propTypes = {
  disabled: PropTypes.bool,
  isSeletor: PropTypes.bool,
  imageStyle: PropTypes.object,
  parentStyle: PropTypes.object,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]).isRequired,
};

export default TouchableImage;
