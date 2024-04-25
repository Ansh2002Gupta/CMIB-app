import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@unthinkable/react-theme";
import { View, Image } from "@unthinkable/react-core-components";

import CommonText from "../CommonText/CommonText";
import getStyles from "./CustomAvatar.style";

const CustomAvatar = ({ image = null, text = "" }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
