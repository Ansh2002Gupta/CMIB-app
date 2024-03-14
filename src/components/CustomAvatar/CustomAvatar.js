import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import styles from "./CustomAvatar.style";

const CustomAvatar = ({ image = null, text = "" }) => {
  if (image) {
    return <Image source={{ uri: image }} style={styles.initialsContainer} />;
  }
  if (text) {
    const initials = text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return (
      <View style={styles.initialsContainer}>
        <CommonText customTextStyle={styles.initialsText}>
          {initials.toUpperCase()}
        </CommonText>
      </View>
    );
  }
  return null;
};

CustomAvatar.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};
export default CustomAvatar;
