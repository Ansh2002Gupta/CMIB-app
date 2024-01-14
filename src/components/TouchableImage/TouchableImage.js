import React, { useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import styles from "./TouchableImage.style";

const TouchableImage = ({
  disabled = true,
  isSelector,
  imageStyle,
  isSvg,
  onPress,
  parentStyle,
  source,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!disabled) setIsSelected((prev) => !prev);
  };

  const containerStyle = {
    ...styles.container,
    ...parentStyle,
    ...(isSelected ? styles.selected : {}),
  };

  return (
    <CustomTouchableOpacity
      style={containerStyle}
      onPress={isSelector ? handlePress : onPress}
      disabled={disabled}
    >
      <View>
        <CustomImage
          Icon={source}
          style={imageStyle}
          source={source}
          isSvg={isSvg}
        />
      </View>
    </CustomTouchableOpacity>
  );
};

TouchableImage.defaultProps = {
  disabled: false,
  isSelector: false,
  imageStyle: {},
  isSvg: true,
  parentStyle: {},
};

TouchableImage.propTypes = {
  disabled: PropTypes.bool,
  isSelector: PropTypes.bool,
  imageStyle: PropTypes.object,
  isSvg: PropTypes.bool,
  parentStyle: PropTypes.object,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};

export default TouchableImage;
