import React, { useState } from "react";
import PropTypes from "prop-types";
import { Platform,TouchableOpacity, View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage/CustomImage";
import styles from "./TouchableImage.style";

const TouchableImage = ({ disabled, imageStyle, parentStyle, source,   }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!disabled) setIsSelected((prev) => !prev);
  };

  const containerStyle = {
    ...styles.container,
    ...parentStyle,
    ...(Platform.OS.toLowerCase() === "web" ? styles.clickable : {}),
    ...(isSelected ? styles.selected : {}),
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
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
    </TouchableOpacity>
  );
};

TouchableImage.defaultProps = {
  disabled: false,
  imageStyle: {},
  parentStyle: {},
};

TouchableImage.propTypes = {
  disabled: PropTypes.bool,
  imageStyle: PropTypes.object,
  parentStyle: PropTypes.object,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default TouchableImage;
