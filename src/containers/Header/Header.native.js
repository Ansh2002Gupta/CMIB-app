import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
} from "@unthinkable/react-core-components";

import images from "../../images";
import styles from "./header.style";

const Header = ({ onPress }) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
        <Image source={images.iconCmibLogo} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
