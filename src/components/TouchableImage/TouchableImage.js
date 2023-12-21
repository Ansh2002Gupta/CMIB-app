import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";

import CustomImage from "../CustomImage/CustomImage";
import styles from "./touchableImage.style";

const TouchableImage = ({ source, parentStyle,imageStyle, disabled }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!disabled)
    setIsSelected(!isSelected);
  };

  const containerStyle = [styles.container,parentStyle, isSelected ? styles.selected : null];

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress} disabled={disabled}>
      <View>
        <CustomImage Icon={source} style={imageStyle} source={source} isSvg={true} />
      </View>
    </TouchableOpacity>
  );
};

export default TouchableImage;
