import React from "react";
import { View, Image } from "@unthinkable/react-core-components";

import images from "../../images";
import styles from "./header.style";

const Header = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.containerStyle}>
        <Image source={images.iconCmibLogo} />
      </View>
    </View>
  );
};

export default Header;
