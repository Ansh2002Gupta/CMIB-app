import React, { useState } from "react";
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from "@unthinkable/react-core-components";

import CustomImage from "../CustomImage/CustomImage";
import styles from "./touchableImage.style";

const TouchableImage = ({ source, parentStyle,imageStyle, disabled }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!disabled)
    setIsSelected(!isSelected);
  };

  const containerStyle = {
    ...styles.container,
    ...parentStyle,
    ...(isSelected ? styles.selected : {}),
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress} disabled={disabled}>
      <View>
        <CustomImage Icon={source} style={imageStyle} source={source} isSvg={true} />
      </View>
    </TouchableOpacity>
  );
};
TouchableImage.defaultProps = {
  parentStyle: {},
  imageStyle: {},
  disabled: false
};
TouchableImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  parentStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  disabled: PropTypes.bool
};
export default TouchableImage;
