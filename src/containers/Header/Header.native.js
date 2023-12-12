import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from "@unthinkable/react-core-components";

import images from "../../images";
import styles from "./header.style";

const Header = ({ onPress }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerStyle}>
        <TouchableOpacity onPress={onPress}>
          <Image source={images.iconCmibLogo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
