import React, { useState } from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../../components/CustomTouchableOpacity";
import styles from "./TouchableImage.style";

const TouchableImage = ({
  disabled = true,
  height,
  isSelector,
  imageStyle,
  isSvg,
  onPress,
  parentStyle,
  source,
  style,
  width,
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
          height={height}
          Icon={source}
          isSvg={isSvg}
          style={{ ...imageStyle, ...style }}
          source={source}
          width={width}
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
  height: PropTypes.number,
  isSelector: PropTypes.bool,
  imageStyle: PropTypes.object,
  isSvg: PropTypes.bool,
  parentStyle: PropTypes.object,
  source: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  width: PropTypes.number,
};

export default TouchableImage;
