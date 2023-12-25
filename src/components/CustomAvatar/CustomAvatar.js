import React from "react";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import styles from "./CustomAvatar.style";

const CustomAvatar = ({ image, text }) => {
  if (image) {
    return <Image source={{ uri: image }} />;
  } else if (text) {
    const initials = text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return (
      <View style={styles.profileTextView}>
        <View style={styles.initialsContainer}>
          <CommonText customTextStyle={styles.initialsText} title={initials} />
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default CustomAvatar;
