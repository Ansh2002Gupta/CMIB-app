import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import styles from "./CustomAvatar.style";

const CustomAvatar = ({ image = null, text = "" }) => {
  if (image) {
    return <Image source={{ uri: image }} />;
  }
  if (text) {
    const initials = text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return (
      <View style={styles.profileTextView}>
        <View style={styles.initialsContainer}>
          <CommonText customTextStyle={styles.initialsText}>
            {initials.toUpperCase()}
          </CommonText>
        </View>
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
