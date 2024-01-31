import React from "react";
import PropTypes from "prop-types";
import { View } from "@unthinkable/react-core-components";

import CommonText from "../CommonText";
import CustomImage from "../CustomImage";
import CustomTouchableOpacity from "../CustomTouchableOpacity";
import images from "../../images";
import styles from "./backButton.style";

const BackButton = ({ title, onPress }) => {
  return (
    <CustomTouchableOpacity onPress={onPress} style={styles.touchableContainer}>
      <View style={styles.container}>
        <CustomImage
          source={images.iconBackArrow}
          isSvg={true}
          Icon={images.iconBackArrow}
          style={styles.backIcon}
        />
        {!!title && (
          <CommonText customTextStyle={styles.text}>{title}</CommonText>
        )}
      </View>
    </CustomTouchableOpacity>
  );
};

BackButton.defaultProps = {
  title: "",
};

BackButton.prototype = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
