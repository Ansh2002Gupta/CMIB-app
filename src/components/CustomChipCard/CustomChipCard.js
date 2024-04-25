import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import TouchableImage from "../TouchableImage";
import images from "../../images";
import getStyles from "./CustomChipCard.style";

const CustomChipCard = ({ message, onPress, isEditable = true }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleClickOnImage = () => {
    onPress && onPress();
  };

  return (
    <View style={styles.selectedItemsContainer}>
      <CommonText>{message}</CommonText>
      {isEditable && (
        <TouchableImage
          onPress={handleClickOnImage}
          source={images.iconCloseDark}
          style={styles.iconCloseDark}
          height={15}
          width={15}
        />
      )}
    </View>
  );
};

CustomChipCard.propTypes = {
  message: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CustomChipCard;
