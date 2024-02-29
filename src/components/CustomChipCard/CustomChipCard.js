import React from "react";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import TouchableImage from "../TouchableImage";
import styles from "./CustomChipCard.style";
import images from "../../images";

const CustomChipCard = ({ message, onPress }) => {
  return (
    <View style={styles.selectedItemsContainer}>
      <CommonText>{message}</CommonText>
      <TouchableImage
        onPress={onPress}
        source={images.iconCloseDark}
        style={styles.iconCloseDark}
        height={15}
        width={15}
      />
    </View>
  );
};

export default CustomChipCard;
