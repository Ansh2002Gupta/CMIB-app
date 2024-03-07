import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import styles from "./CustomChipCard.style";

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

CustomChipCard.defaultProps = {
  message: "",
  onPress: () => {},
};

CustomChipCard.propTypes = {
  message: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CustomChipCard;
